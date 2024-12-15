import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  getValueData,
  getTempName,
  getLineVar,
  flags,
  isBooleanContext,
  parseObjectExpression,
} from "../util.js"
import { NodePath, VisitNode, Visitor } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import { actionBlocks } from "../plugin"
import shortcuts from "./shortcuts"
import visitors from "../visitors.js"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      const { callee, arguments: args } = path.node
      if (t.isCallExpression(callee)) {
        // @ts-ignore
        callee.tags = args[0]
        path.replaceWith(callee)
      }
    },
    exit(path) {
      if (flags.debug) console.log("CallExpression")
      const { callee } = path.node
      const parsedCallee = parseCallee(t, callee as BabelTypes.Expression)

      if (
        t.isMemberExpression(callee) &&
        t.isIdentifier((callee as BabelTypes.MemberExpression).object) &&
        Object.keys(actionBlocks).includes(
          (
            (callee as BabelTypes.MemberExpression)
              .object as BabelTypes.Identifier
          ).name
        )
      )
        parsedCallee && shortcuts[parsedCallee] === undefined
          ? CodeAction(t, threadContents, path)
          : ShortcutActions(t, threadContents, path)
      else ShortcutActions(t, threadContents, path)
    },
  } as VisitNode<PluginOptions, BabelTypes.CallExpression>)

function ShortcutActions(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  path: NodePath<BabelTypes.CallExpression>
) {
  const { callee, arguments: args } = path.node
  const tempVar = getTempName()
  const parsedCallee = parseCallee(t, callee as BabelTypes.Expression)
  if (parsedCallee === undefined)
    throw new Error("Could not parse callee in CallExpression shortcut action")

  if (shortcuts[parsedCallee] !== undefined) {
    const shortcut = shortcuts[parsedCallee](
      t,
      tempVar,
      args as BabelTypes.Expression[]
    ) as
      | [BabelTypes.ObjectExpression[], boolean]
      | BabelTypes.ObjectExpression[]

    threadContents.push(
      ...(Array.isArray(shortcut[0])
        ? (shortcut[0] as BabelTypes.ObjectExpression[])
        : (shortcut as BabelTypes.ObjectExpression[]))
    )
    if (shortcut[1] !== false) path.replaceWith(getLineVar(t, tempVar))
  } else {
    const isDynamic =
      parsedCallee === "StartProcess" || parsedCallee === "CallFunction"
    threadContents.push(
      getBlockObject(
        t,
        parsedCallee === "StartProcess" ? "start_process" : "call_func",
        "",
        (isDynamic ? args.slice(1) : args).map((arg, i) =>
          getArgObject(
            t,
            i,
            getValueData(t, arg as any),
            getValueType(t, arg as any)
          )
        ),
        {
          data: isDynamic
            ? t.isIdentifier(args[0])
              ? t.stringLiteral(`%var(${args[0].name})`)
              : args[0]
            : t.stringLiteral(parsedCallee),
        }
      )
    )
  }
}

function parseCallee(t: typeof BabelTypes, callee: BabelTypes.Expression) {
  if (t.isMemberExpression(callee)) {
    const { object, property } = callee as BabelTypes.MemberExpression
    if (t.isIdentifier(object) && t.isIdentifier(property))
      return `${object.name}.${property.name}`
    else if (t.isIdentifier(property)) return property.name
  } else return (callee as BabelTypes.Identifier).name
}

function CodeAction(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  path: NodePath<BabelTypes.CallExpression>
) {
  if (
    isBooleanContext(t, path.node) &&
    !path.findParent((p) => t.isIfStatement(p.node))
  )
    return booleanContext(t, threadContents, path, path.node)

  // @ts-ignore
  const { callee, arguments: args, tags } = path.node
  const expression = callee as BabelTypes.MemberExpression

  threadContents.push(
    getBlockObject(
      t,
      // @ts-ignore
      actionBlocks[expression.object.name],
      // @ts-ignore
      expression.property.name,
      args
        .map((arg, i) =>
          t.isNullLiteral(arg)
            ? null
            : getArgObject(
                t,
                i,
                getValueData(t, arg as any),
                getValueType(t, arg as any)
              )
        )
        .filter(Boolean),
      // @ts-ignore
      actionBlocks[expression.object.name] === "start_process"
        ? {
            // @ts-ignore
            data: t.stringLiteral(expression.property.name),
          }
        : undefined,
      tags
    )
  )
}

export function booleanContext(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  path: NodePath<any>,
  condition: BabelTypes.Expression
) {
  const id = t.identifier(getTempName())

  // Create the if statement
  // traverse the if statement below

  const ifStatement = t.ifStatement(
    condition,
    t.blockStatement([
      t.variableDeclaration("const", [
        t.variableDeclarator(id, t.numericLiteral(1)),
      ]),
    ]),
    t.blockStatement([
      t.variableDeclaration("const", [
        t.variableDeclarator(id, t.numericLiteral(0)),
      ]),
    ])
  )

  // Replace the current node with the variable
  path.replaceWith(id)
  // Find the closest parent directly within the line starter function
  const closestParent = path.findParent((p) =>
    t.isFunctionDeclaration(p.parentPath?.parent)
  )
  const insertedNode = closestParent?.insertBefore(ifStatement)?.[0]

  if (insertedNode) {
    insertedNode.traverse(visitors(t, threadContents) as Visitor<unknown>)
    insertedNode.shouldSkip = true
  }
}

import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  getValueData,
  getTempName,
  getLineVar,
  ValidLiteral,
  flags,
} from "../util.js"
import { NodePath, VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import { actionBlocks } from "../plugin"
import shortcuts from "./shortcuts"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      const { callee, arguments: args } = path.node
      if (t.isCallExpression(callee)) {
        // @ts-ignore
        callee.tags = (
          args[0] as BabelTypes.ObjectExpression
        ).properties.reduce((acc: Record<string, any>, prop) => {
          acc[
            ((prop as BabelTypes.ObjectProperty).key as ValidLiteral)
              .value as string
          ] = ((prop as BabelTypes.ObjectProperty).value as ValidLiteral).value
          return acc
        }, {})
        path.replaceWith(callee)
      }
    },
    exit(path) {
      if (flags.debug) console.log("CallExpression")
      const { callee } = path.node

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
        CodeAction(t, threadContents, path)
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
    threadContents.push(
      ...shortcuts[parsedCallee](t, tempVar, args as BabelTypes.Expression[])
    )
    path.replaceWith(getLineVar(t, tempVar))
  } else {
    threadContents.push(
      getBlockObject(
        t,
        "call_func",
        "",
        args.map((arg, i) =>
          getArgObject(
            t,
            i,
            getValueData(t, arg as any),
            getValueType(t, arg as any)
          )
        ),
        {
          data: t.stringLiteral(parsedCallee),
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
      path.findParent((p) => p.isUnaryExpression())
        ? {
            attribute: t.stringLiteral("NOT"),
          }
        : // @ts-ignore
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

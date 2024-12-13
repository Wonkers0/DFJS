import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
  getVarScope,
} from "../util.js"
import { NodePath, VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      const { init } = path.node

      if (isBooleanContext(t, init)) booleanContext(t, path)
    },
    exit(path) {
      const { init, id } = path.node as {
        init: ValidLiteral
        id: BabelTypes.Identifier
      }
      if (init == null) return // Unitialized variables such as `const example;` do not need to be parsed

      if (process.env.debug) console.log("Variable Declarator")

      // Push block object to threadContents array above holding the objects in the parent function
      threadContents.push(
        getBlockObject(t, "set_var", "=", [
          getArgObject(
            t,
            0,
            {
              name: id.name,
              // 👇 Get internal variable scope of var type annotation in user's code
              // e.g. `const exampleVariable: *Game*` <-- We're parsing this to a name that df templates understand
              scope: getVarScope(id),
            },
            "var"
          ),
          getArgObject(t, 1, getValueData(t, init), getValueType(t, init)),
        ])
      )
    },
  } as VisitNode<PluginOptions, BabelTypes.VariableDeclarator>)

function booleanContext(
  t: typeof BabelTypes,
  path: NodePath<BabelTypes.VariableDeclarator>
) {
  const { init, id } = path.node as {
    init: BabelTypes.Expression
    id: BabelTypes.Identifier
  }

  // Create the if statement
  const ifStatement = t.ifStatement(
    init, // condition
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

  // Replace the current node with the if statement
  path.replaceWith(ifStatement)
}

const booleanOperators = ["==", "===", "!=", "!==", ">", "<", ">=", "<="]
function isBooleanContext(
  t: typeof BabelTypes,
  init: BabelTypes.Expression | null | undefined
) {
  if (t.isBinaryExpression(init) && booleanOperators.includes(init.operator))
    return true
  if (t.isCallExpression(init)) {
    const callExp = init as BabelTypes.CallExpression
    if (t.isMemberExpression(callExp.callee)) {
      const memberExp = callExp.callee as BabelTypes.MemberExpression
      if (
        t.isIdentifier(memberExp.object) &&
        memberExp.object.name.includes("If")
      )
        return true
    }
  }

  return t.isUnaryExpression(init)
}

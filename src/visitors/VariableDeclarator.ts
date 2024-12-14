import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
  getVarScope,
  flags,
  isBooleanContext,
} from "../util.js"
import { NodePath, VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      const { init, id } = path.node

      if (
        t.isIdentifier(id) &&
        t.isCallExpression(init) &&
        t.isMemberExpression(init.callee) &&
        t.isIdentifier(init.callee.object) &&
        init.callee.object.name === "SetVariable"
      ) {
        init.arguments.unshift(id)
        path.replaceWith(init)
        return
      }
      if (isBooleanContext(t, init)) return
    },
    exit(path) {
      const { init, id } = path.node as {
        init: ValidLiteral
        id: BabelTypes.Identifier
      }
      if (init == null) return // Unitialized variables such as `const example;` do not need to be parsed

      if (flags.debug) console.log("Variable Declarator")

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

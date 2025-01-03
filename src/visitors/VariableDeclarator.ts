import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  getValueData,
  getVarScope,
  flags,
  isBooleanContext,
} from "../util.js"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      const { init } = path.node

      if (isBooleanContext(t, init)) return
    },
    exit(path) {
      const { init, id } = path.node as {
        init: any
        id: BabelTypes.Identifier
      }
      if (init == null) return // Unitialized variables such as `const example;` do not need to be parsed

      if (flags.debug) console.log("Variable Declarator")

      if (
        t.isIdentifier(id) &&
        t.isCallExpression(init) &&
        ((t.isMemberExpression(init.callee) &&
          t.isIdentifier(init.callee.object) &&
          init.callee.object.name === "SetVariable") ||
          (t.isCallExpression(init.callee) &&
            t.isMemberExpression(init.callee.callee) &&
            t.isIdentifier(init.callee.callee.object) &&
            init.callee.callee.object.name === "SetVariable"))
      ) {
        const args = t.isCallExpression(init.callee)
          ? init.callee.arguments
          : init.arguments

        args.unshift(id)
        path.replaceWith(init)
        return
      }

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

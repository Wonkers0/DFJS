import * as BabelTypes from "@babel/types"

import {
  getBlockObject,
  getArgObject,
  getValueType,
  parseValueToLiteral,
  generateUniqueVarID,
  getVarScope,
  getValue,
  ValidLiteral,
} from "./util.js"
import { PluginOptions, Visitor } from "@babel/core"
import { Identifier } from "@babel/types"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
): Visitor<PluginOptions> => ({
  VariableDeclarator: {
    exit(path) {
      console.log("Variable declarator")
      const { init, id } = path.node as { init: ValidLiteral; id: Identifier }
      if (init == null) return // Unitialized variables such as `const example;` do not need to be parsed

      console.log("Variable Declarator")
      console.log(init)

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
          getArgObject(
            t,
            1,
            {
              name: getValue(t, init),
              //prettier-ignore
              // 👇 Include variable scope field if init is actually a variable
              ...(t.isIdentifier(init) ? { scope: getVarScope(init as Identifier) } : {}),
            },
            getValueType(t, init)
          ),
        ])
      )
    },
  },
  BinaryExpression: {
    exit(path) {
      console.log("Binary expression")
      const { left, right, operator } = path.node as {
        left: ValidLiteral
        right: ValidLiteral
        operator: string
      }
      console.log(left.value)
      console.log(right.value)
      switch (operator) {
        case "+":
        case "-":
        case "/":
        case "*":
          const operatorMapping = {
            "+": "+",
            "-": "-",
            "/": "/",
            "*": "x",
          }

          const tempVar = `DFJS_${generateUniqueVarID()}`
          threadContents.push(
            getBlockObject(t, "set_var", operatorMapping[operator], [
              getArgObject(
                t,
                0,
                {
                  name: tempVar,
                  // 👇 Get internal variable scope of var type annotation in user's code
                  // e.g. `const exampleVariable: *Game*` <-- We're parsing this to a name that df templates understand
                  scope: "local",
                },
                "var"
              ),
              getArgObject(
                t,
                1,
                {
                  name: getValue(t, left),
                },
                getValueType(t, left)
              ),
              getArgObject(
                t,
                2,
                {
                  name: getValue(t, right),
                  //prettier-ignore
                  // 👇 Include variable scope field if init is actually a variable
                  ...(t.isIdentifier(right) ? { scope: getVarScope(right as Identifier) } : {}),
                },
                getValueType(t, right)
              ),
            ])
          )

          // Create identifier node
          const identifierNode = t.identifier(tempVar)

          // Set variable scope to 'local'
          identifierNode.typeAnnotation = t.tsTypeAnnotation(
            // @ts-ignore I'm probably doing some illegal things here to recreate the AST from the babel parser
            t.tsTypeReference(t.identifier("local"))
          )

          path.replaceWith(identifierNode)
      }
    },
  },
})

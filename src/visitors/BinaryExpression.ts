import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
  getLineVar,
  getTempName,
  flags,
} from "../util.js"
import { NodePath, VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import { booleanContext } from "./CallExpression.js"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      if (flags.debug) console.log("Binary expression")
      const { operator } = path.node

      switch (operator) {
        case "+":
        case "-":
        case "/":
        case "*":
        case "**":
        case "%":
          arithmeticContext(t, threadContents, path)
          break
        case "==":
        case "===":
        case "!=":
        case ">":
        case "<":
        case ">=":
        case "<=":
          if (!t.isIfStatement(path.parent))
            // 👆 Conditional contexts occur only when direct parents are if statements
            // e.g. binary expressions inside an if-statement should still be parsed in a boolean context
            booleanContext(t, threadContents, path, path.node)
          else conditionalContext(t, threadContents, path)
          break
      }
    },
  } as VisitNode<PluginOptions, BabelTypes.BinaryExpression>)

function arithmeticContext(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  path: NodePath<BabelTypes.BinaryExpression>
) {
  const { operator, left, right } = path.node

  const operatorMapping = {
    "+": "+",
    "-": "-",
    "/": "/",
    "*": "x",
    "**": "Exponent",
    "%": "%",
  }

  const tempVar = getTempName()
  threadContents.push(
    getBlockObject(
      t,
      "set_var",
      operatorMapping[operator as keyof typeof operatorMapping],
      [
        getArgObject(
          t,
          0,
          {
            name: tempVar,
            scope: "line",
          },
          "var"
        ),
        getArgObject(
          t,
          1,
          getValueData(t, left as ValidLiteral),
          getValueType(t, left as ValidLiteral)
        ),
        getArgObject(
          t,
          2,
          getValueData(t, right as ValidLiteral),
          getValueType(t, right as ValidLiteral)
        ),
      ]
    )
  )

  path.replaceWith(getLineVar(t, tempVar))
}

function conditionalContext(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  path: NodePath<BabelTypes.BinaryExpression>
) {
  const { operator, left, right } = path.node

  threadContents.push(
    getBlockObject(
      t,
      "if_var",
      operator == "==" || operator == "===" ? "=" : operator,
      [
        getArgObject(
          t,
          0,
          getValueData(t, left as ValidLiteral),
          getValueType(t, left as ValidLiteral)
        ),
        getArgObject(
          t,
          1,
          getValueData(t, right as ValidLiteral),
          getValueType(t, right as ValidLiteral)
        ),
      ]
    )
  )
}

import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import { flags } from "../util"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      const { operator, left, right } = path.node
      if (flags.debug) console.log("UnaryExpression")

      switch (operator) {
        case "&&":
          path.replaceWith(t.binaryExpression("*", left, right))
          break
        case "||":
          path.replaceWith(
            t.binaryExpression(
              ">=",
              t.binaryExpression("+", left, right),
              t.numericLiteral(1)
            )
          )
          break
      }
    },
  } as VisitNode<PluginOptions, BabelTypes.LogicalExpression>)

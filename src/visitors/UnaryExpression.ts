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
      const { operator, argument } = path.node
      if (flags.debug) console.log("UnaryExpression")

      switch (operator) {
        case "-":
        case "+":
          if (t.isNumericLiteral(argument))
            path.replaceWith(
              t.numericLiteral(parseFloat(`${operator}${argument.value}`))
            )
          break
        case "!":
          path.replaceWith(
            t.binaryExpression("-", t.numericLiteral(1), argument)
          )
          break
      }
    },
  } as VisitNode<PluginOptions, BabelTypes.UnaryExpression>)

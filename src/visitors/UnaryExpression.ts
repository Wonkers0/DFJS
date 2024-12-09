import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      const { operator, argument } = path.node
      if (t.isNumericLiteral(argument))
        path.replaceWith(
          t.numericLiteral(parseFloat(`${operator}${argument.value}`))
        )
    },
  } as VisitNode<PluginOptions, BabelTypes.UnaryExpression>)

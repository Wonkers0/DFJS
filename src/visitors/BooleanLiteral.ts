import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      const { value } = path.node
      path.replaceWith(t.numericLiteral(Number(value)))
    },
  } as VisitNode<PluginOptions, BabelTypes.BooleanLiteral>)

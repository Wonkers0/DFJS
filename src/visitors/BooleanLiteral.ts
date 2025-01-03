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
      path.replaceWith(t.numericLiteral(1))
    },
  } as VisitNode<PluginOptions, BabelTypes.BooleanLiteral>)

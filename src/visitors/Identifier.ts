import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      path.node.name = path.node.name.replace("$", "%")
    },
  } as VisitNode<PluginOptions, BabelTypes.Identifier>)

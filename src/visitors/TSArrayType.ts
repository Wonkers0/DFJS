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
      const { elementType } = path.node
      if (flags.debug) console.log("TSArrayType")

      const identifier = path.findParent((p) => t.isIdentifier(p.node))
      // @ts-ignore
      if (identifier) identifier.node.plural = true

      path.replaceWith(elementType as BabelTypes.TSTypeReference) // String[] --> String
    },
  } as VisitNode<PluginOptions, BabelTypes.TSArrayType>)

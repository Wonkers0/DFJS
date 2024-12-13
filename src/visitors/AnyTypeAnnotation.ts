import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      if (process.env.debug) console.log("AnyTypeAnnotation")

      path.replaceWith(t.genericTypeAnnotation(t.identifier("any")))
    },
  } as VisitNode<PluginOptions, BabelTypes.AnyTypeAnnotation>)

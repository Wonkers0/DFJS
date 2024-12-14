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
      if (flags.debug) console.log("AnyTypeAnnotation")

      path.replaceWith(t.genericTypeAnnotation(t.identifier("any")))
    },
  } as VisitNode<PluginOptions, BabelTypes.AnyTypeAnnotation>)

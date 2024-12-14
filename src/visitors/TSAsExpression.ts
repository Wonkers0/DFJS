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
      if (flags.debug) console.log("TSAsExpression")
      const { expression, typeAnnotation } = path.node

      // @ts-ignore
      expression.typeAnnotation = t.tsTypeAnnotation(typeAnnotation)

      path.replaceWith(expression)
    },
  } as VisitNode<PluginOptions, BabelTypes.TSAsExpression>)

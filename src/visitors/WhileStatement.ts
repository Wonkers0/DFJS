import * as BabelTypes from "@babel/types"
import { getBlockObject } from "../util.js"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      const { test } = path.node
      if (t.isBooleanLiteral(test) && (test as BabelTypes.BooleanLiteral).value)
        threadContents.push(getBlockObject(t, "repeat", "Forever", []))
    },
  } as VisitNode<PluginOptions, BabelTypes.WhileStatement>)

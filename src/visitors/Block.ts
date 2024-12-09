import * as BabelTypes from "@babel/types"
import { getBracketObject, getElseObject } from "../util.js"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      console.log("BlockStatement")

      if ((path.parent as BabelTypes.IfStatement).alternate == path.node)
        threadContents.push(getElseObject(t))

      if (path.findParent((p) => p.isIfStatement()))
        threadContents.push(getBracketObject(t, "norm", true))
      else if (path.findParent((p) => p.isLoop()))
        threadContents.push(getBracketObject(t, "sticky", true))
    },
    exit(path) {
      if (path.findParent((p) => p.isIfStatement()))
        threadContents.push(getBracketObject(t, "norm", false))
      else if (path.findParent((p) => p.isLoop()))
        threadContents.push(getBracketObject(t, "sticky", false))
    },
  } as VisitNode<PluginOptions, BabelTypes.Block>)

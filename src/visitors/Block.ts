import * as BabelTypes from "@babel/types"
import {
  flags,
  getBlockObject,
  getBracketObject,
  getElseObject,
} from "../util.js"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import visitors from "../visitors.js"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      if (flags.debug) console.log("BlockStatement")

      if ((path.parent as BabelTypes.IfStatement).alternate == path.node)
        threadContents.push(getElseObject(t))

      if (t.isIfStatement(path.parent))
        threadContents.push(getBracketObject(t, "norm", true))
      else if (t.isLoop(path.parent))
        threadContents.push(getBracketObject(t, "sticky", true))
    },
    exit(path) {
      if (t.isIfStatement(path.parent))
        threadContents.push(getBracketObject(t, "norm", false))
      else if (t.isLoop(path.parent))
        threadContents.push(getBracketObject(t, "sticky", false))

      const sibling = path.getPrevSibling().node
      if (isSelectObject(t, sibling)) {
        const parentSelect = path
          .findParent((p) => t.isBlock(p.node))
          ?.getPrevSibling()
        isSelectObject(t, parentSelect?.node)
          ? parentSelect?.traverse(visitors(t, threadContents) as any)
          : threadContents.push(getBlockObject(t, "select_obj", "Reset"))
      }
    },
  } as VisitNode<PluginOptions, BabelTypes.Block>)

const isSelectObject = (t: typeof BabelTypes, node?: BabelTypes.Node) =>
  node &&
  t.isExpressionStatement(node) &&
  t.isCallExpression(node.expression) &&
  t.isMemberExpression(node.expression.callee) &&
  t.isIdentifier(node.expression.callee.object) &&
  node.expression.callee.object.name == "SelectObject"

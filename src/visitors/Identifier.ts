import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import { getArgObject, getBlockObject, getLineVar, getValueData } from "../util"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      path.node.name = path.node.name.replace("$", "%")

      // 👇 if(myVar) or if(1 < 2 && 2 < 3)
      if (t.isIfStatement(path.parent))
        threadContents.push(
          getBlockObject(t, "if_var", "=", [
            getArgObject(t, 0, getValueData(t, path.node), "var"),
            getArgObject(t, 1, getValueData(t, t.numericLiteral(1)), "num"),
          ])
        )
    },
  } as VisitNode<PluginOptions, BabelTypes.Identifier>)

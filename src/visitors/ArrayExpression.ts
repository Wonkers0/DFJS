import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
  getVarScope,
  getLineVar,
  getTempName,
} from "../util.js"
import { NodePath, VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      const { elements } = path.node

      const tempVar = getTempName()
      threadContents.push(
        getBlockObject(t, "set_var", "CreateList", [
          getArgObject(
            t,
            0,
            {
              name: tempVar,
              scope: "line",
            },
            "var"
          ),
          ...elements.map((element, i) =>
            getArgObject(
              t,
              i + 1,
              getValueData(t, element as any),
              getValueType(t, element as any)
            )
          ),
        ])
      )

      path.replaceWith(getLineVar(t, tempVar))
    },
  } as VisitNode<PluginOptions, BabelTypes.ArrayExpression>)

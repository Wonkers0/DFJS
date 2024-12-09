import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import {
  getArgObject,
  getBlockObject,
  getValueData,
  getValueType,
} from "../util"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    enter(path) {
      const { left, right } = path.node

      threadContents.push(
        getBlockObject(t, "repeat", "ForEach", [
          getArgObject(
            t,
            0,
            {
              name: (
                (left as BabelTypes.VariableDeclaration).declarations[0]
                  .id as BabelTypes.Identifier
              ).name,
              scope: "line",
            },
            "var"
          ),
          getArgObject(
            t,
            1,
            getValueData(t, right as BabelTypes.Identifier),
            getValueType(t, right as BabelTypes.Identifier)
          ),
        ])
      )
    },
  } as VisitNode<PluginOptions, BabelTypes.ForOfStatement>)

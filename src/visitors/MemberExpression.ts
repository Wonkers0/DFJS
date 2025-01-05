import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import {
  flags,
  getArgObject,
  getBlockObject,
  getTempName,
  getValueData,
  getValueType,
  ValidLiteral,
} from "../util"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      if (flags.debug) console.log("Member Expression")

      const { computed, object, property } = path.node
      // ["asdgd"] or [myVar] vs myDict.key
      if (!computed || !t.isIdentifier(object)) return

      const tempVar = getTempName()

      threadContents.push(
        getBlockObject(t, "set_var", "GetDictValue", [
          getArgObject(t, 0, { name: tempVar, scope: "line" }, "var"),
          getArgObject(t, 1, getValueData(t, object), "var"),
          getArgObject(
            t,
            2,
            getValueData(t, property as BabelTypes.Identifier | ValidLiteral),
            getValueType(t, property as BabelTypes.Identifier | ValidLiteral)
          ),
        ])
      )

      path.replaceWith(t.identifier(tempVar))
    },
  } as VisitNode<PluginOptions, BabelTypes.MemberExpression>)

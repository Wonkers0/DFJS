import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import {
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
      const { properties } = path.node
      const dictName = getTempName()
      threadContents.push(
        getBlockObject(t, "set_var", "CreateDict", [
          getArgObject(t, 0, { name: dictName, scope: "line" }, "var"),
        ])
      )

      if (properties.find((p) => !t.isObjectProperty(p)))
        throw new Error(
          "DFJS does not support computed properties in object literals (i.e. dictionaries)"
        )

      const sanitizedProperties = properties
        .filter((p) => t.isObjectProperty(p))
        .map(
          (p) =>
            p as {
              key: BabelTypes.Identifier
              value: BabelTypes.Identifier | ValidLiteral
            }
        )

      for (const property of sanitizedProperties)
        threadContents.push(
          getBlockObject(t, "set_var", "SetDictValue", [
            getArgObject(t, 0, { name: dictName, scope: "line" }, "var"),
            getArgObject(
              t,
              1,
              getValueData(
                t,
                t.stringLiteral((property.key as BabelTypes.Identifier).name)
              ),
              "txt"
            ),
            getArgObject(
              t,
              2,
              getValueData(t, property.value),
              getValueType(t, property.value)
            ),
          ])
        )

      path.replaceWith(t.identifier(dictName))
    },
  } as VisitNode<PluginOptions, BabelTypes.ObjectExpression>)

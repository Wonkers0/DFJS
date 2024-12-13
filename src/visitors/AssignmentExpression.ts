import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
  getLineVar,
  getTempVarName,
} from "../util.js"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      const { operator, left, right } = path.node

      if (process.env.debug) console.log("AssignmentExpression")

      switch (operator) {
        case "+=":
        case "-=":
          threadContents.push(
            getBlockObject(t, "set_var", operator, [
              getArgObject(
                t,
                0,
                getValueData(t, left as BabelTypes.Identifier),
                getValueType(t, left as BabelTypes.Identifier)
              ),
              getArgObject(
                t,
                1,
                getValueData(t, right as ValidLiteral),
                getValueType(t, right as ValidLiteral)
              ),
            ])
          )
          break
        case "/=":
        case "*=":
          const operatorMapping = {
            "/=": "/",
            "*=": "x",
          }
          threadContents.push(
            getBlockObject(t, "set_var", operatorMapping[operator], [
              getArgObject(
                t,
                0,
                getValueData(t, left as BabelTypes.Identifier),
                getValueType(t, left as BabelTypes.Identifier)
              ),
              getArgObject(
                t,
                1,
                getValueData(t, left as BabelTypes.Identifier),
                getValueType(t, left as BabelTypes.Identifier)
              ),
              getArgObject(
                t,
                2,
                getValueData(t, right as ValidLiteral),
                getValueType(t, right as ValidLiteral)
              ),
            ])
          )
          break
      }
    },
  } as VisitNode<PluginOptions, BabelTypes.AssignmentExpression>)

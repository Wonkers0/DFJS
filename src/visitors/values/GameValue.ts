import * as BabelTypes from "@babel/types"
import { getBlockObject, getArgObject } from "../../util"

export default function GameValue(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  constructor: { [key: string]: BabelTypes.Expression },
  varName: string
) {
  constructor = Object.assign(
    {
      target: t.stringLiteral("Default"),
    },
    constructor
  )

  threadContents.push(
    getBlockObject(t, "set_var", "=", [
      getArgObject(
        t,
        0,
        {
          name: varName,
          scope: "line",
        },
        "var"
      ),
      getArgObject(
        t,
        1,
        {
          type: (constructor.type as BabelTypes.StringLiteral).value,
          target: (constructor.target as BabelTypes.StringLiteral).value,
        },
        "g_val"
      ),
    ])
  )
}

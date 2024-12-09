import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
} from "../../util"

export default function PotionEffect(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  constructor: { [key: string]: BabelTypes.Expression },
  varName: string
) {
  constructor = Object.assign(
    {
      duration: t.numericLiteral(1000000),
      amplifier: t.numericLiteral(0),
    },
    constructor
  )

  threadContents.push(
    getBlockObject(t, "set_var", "SetPotionType", [
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
        getValueData(t, constructor.type as ValidLiteral),
        getValueType(t, constructor.type as ValidLiteral)
      ),
    ])
  )

  threadContents.push(
    getBlockObject(t, "set_var", "SetPotionDur", [
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
        getValueData(t, constructor.duration as ValidLiteral),
        getValueType(t, constructor.duration as ValidLiteral)
      ),
    ])
  )

  threadContents.push(
    getBlockObject(t, "set_var", "SetPotionAmp", [
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
        getValueData(t, constructor.amplifier as ValidLiteral),
        getValueType(t, constructor.amplifier as ValidLiteral)
      ),
    ])
  )
}

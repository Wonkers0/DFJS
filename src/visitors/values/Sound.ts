import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
} from "../../util"

export default function Sound(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  constructor: { [key: string]: BabelTypes.Expression },
  varName: string
) {
  constructor = Object.assign(
    {
      pitch: t.numericLiteral(1),
      volume: t.numericLiteral(2),
    },
    constructor
  )

  threadContents.push(
    getBlockObject(t, "set_var", "SetSoundType", [
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
    getBlockObject(t, "set_var", "SetSoundPitch", [
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
        getValueData(t, constructor.pitch as ValidLiteral),
        getValueType(t, constructor.pitch as ValidLiteral)
      ),
    ])
  )

  threadContents.push(
    getBlockObject(t, "set_var", "SetSoundVolume", [
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
        getValueData(t, constructor.volume as ValidLiteral),
        getValueType(t, constructor.volume as ValidLiteral)
      ),
    ])
  )
}

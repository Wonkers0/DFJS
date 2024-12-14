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

  if (constructor.pitch != undefined)
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

  if (constructor.volume != undefined)
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

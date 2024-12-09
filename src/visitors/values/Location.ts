import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
} from "../../util"

export default function Location(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  constructor: { [key: string]: BabelTypes.Expression },
  varName: string
) {
  constructor = Object.assign(
    {
      x: t.numericLiteral(0),
      y: t.numericLiteral(0),
      z: t.numericLiteral(0),
      pitch: t.numericLiteral(0),
      yaw: t.numericLiteral(0),
    },
    constructor
  )

  threadContents.push(
    getBlockObject(t, "set_var", "SetAllCoords", [
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
        getValueData(t, constructor.x as ValidLiteral),
        getValueType(t, constructor.x as ValidLiteral)
      ),
      getArgObject(
        t,
        2,
        getValueData(t, constructor.y as ValidLiteral),
        getValueType(t, constructor.y as ValidLiteral)
      ),
      getArgObject(
        t,
        3,
        getValueData(t, constructor.z as ValidLiteral),
        getValueType(t, constructor.z as ValidLiteral)
      ),
      getArgObject(
        t,
        4,
        getValueData(t, constructor.pitch as ValidLiteral),
        getValueType(t, constructor.pitch as ValidLiteral)
      ),
      getArgObject(
        t,
        5,
        getValueData(t, constructor.yaw as ValidLiteral),
        getValueType(t, constructor.yaw as ValidLiteral)
      ),
    ])
  )
}

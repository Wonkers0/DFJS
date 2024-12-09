import * as BabelTypes from "@babel/types"
import {
  getArgObject,
  getBlockObject,
  getValueData,
  getValueType,
} from "../util"

const lvar = (name: string) => ({
  name,
  scope: "line",
})

export default {
  parseInt: (t, tempVar, args) => [
    getBlockObject(t, "set_var", "ParseNumber", [
      getArgObject(t, 0, lvar(tempVar), "var"),
      getArgObject(
        t,
        1,
        getValueData(t, args[0] as any),
        getValueType(t, args[0] as any)
      ),
    ]),
  ],
  "Math.random": (t, tempVar, args) => [
    getBlockObject(
      t,
      "set_var",
      "RandomNumber",
      [
        getArgObject(t, 0, lvar(tempVar), "var"),
        getArgObject(t, 1, { name: 0 }, "num"),
        getArgObject(t, 2, { name: 1 }, "num"),
      ],
      [],
      ["Decimal number"]
    ),
  ],
  "Math.floor": (t, tempVar, args) => round(t, tempVar, args, "Floor"),
  "Math.round": (t, tempVar, args) => round(t, tempVar, args, "Nearest"),
  "Math.ceil": (t, tempVar, args) => round(t, tempVar, args, "Ceiling"),
} as {
  [key: string]: (
    t: typeof BabelTypes,
    tempVar: string,
    args: BabelTypes.Expression[]
  ) => BabelTypes.ObjectExpression[]
}

function round(
  t: typeof BabelTypes,
  tempVar: string,
  args: BabelTypes.Expression[],
  tag: "Floor" | "Nearest" | "Ceiling"
) {
  return [
    getBlockObject(
      t,
      "set_var",
      "Round",
      [
        getArgObject(t, 0, lvar(tempVar), "var"),
        getArgObject(
          t,
          1,
          getValueData(t, args[0] as any),
          getValueType(t, args[0] as any)
        ),
      ],
      [],
      [tag]
    ),
  ]
}

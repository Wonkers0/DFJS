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
      { "Rounding Mode": "Decimal number" }
    ),
  ],
  "Math.floor": (t, tempVar, args) => round(t, tempVar, args, "Floor"),
  "Math.round": (t, tempVar, args) => round(t, tempVar, args, "Nearest"),
  "Math.ceil": (t, tempVar, args) => round(t, tempVar, args, "Ceiling"),
  "Math.abs": (t, tempVar, args) => [
    getBlockObject(t, "set_var", "AbsoluteValue", [
      getArgObject(t, 0, lvar(tempVar), "var"),
      getArgObject(
        t,
        1,
        getValueData(t, args[0] as any),
        getValueType(t, args[0] as any)
      ),
    ]),
  ],
  "SelectObject.Default": (t) => EventTarget(t, "Default"),
  "SelectObject.Killer": (t) => EventTarget(t, "Killer"),
  "SelectObject.Damager": (t) => EventTarget(t, "Damager"),
  "SelectObject.Victim": (t) => EventTarget(t, "Victim"),
  "SelectObject.Shooter": (t) => EventTarget(t, "Shooter"),
  "SelectObject.Projectile": (t) => EventTarget(t, "Projectile"),
} as {
  [key: string]: (
    t: typeof BabelTypes,
    tempVar: string,
    args: BabelTypes.Expression[]
  ) => BabelTypes.ObjectExpression[] | [BabelTypes.ObjectExpression[], boolean]
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
      { "Round Mode": tag }
    ),
  ]
}

function EventTarget(
  t: typeof BabelTypes,
  target: "Default" | "Killer" | "Damager" | "Victim" | "Shooter" | "Projectile"
) {
  return [
    [
      getBlockObject(
        t,
        "select_obj",
        "EventTarget",
        [],
        {},
        {
          "Event Target": target,
        }
      ),
    ],
    false,
  ] as [BabelTypes.ObjectExpression[], boolean]
}

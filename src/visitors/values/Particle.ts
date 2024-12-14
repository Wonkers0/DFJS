import * as BabelTypes from "@babel/types"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  ValidLiteral,
  getValueData,
} from "../../util"

export default function Item(
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[],
  constructor: { [key: string]: BabelTypes.Expression },
  varName: string
) {
  constructor = Object.assign(
    {
      sizeVariation: t.numericLiteral(0),
      colorVariation: t.numericLiteral(0),
      motionVariation: t.numericLiteral(0),
    },
    constructor
  )

  if (constructor.xSpread || constructor.ySpread)
    constructor = Object.assign(
      {
        xSpread: t.numericLiteral(0),
        ySpread: t.numericLiteral(0),
      },
      constructor
    )

  threadContents.push(
    getBlockObject(t, "set_var", "SetParticleType", [
      getArgObject(
        t,
        0,
        {
          name: varName,
          scope: "line",
        },
        "var"
      ),
      // SetParticleType does not work without a default particle
      getArgObject(t, 1, { particle: "Poof" }, "part"),
      getArgObject(
        t,
        2,
        getValueData(t, constructor.type as ValidLiteral),
        getValueType(t, constructor.type as ValidLiteral)
      ),
    ])
  )

  if (constructor.amount)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleAmount", [
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
          getValueData(t, constructor.amount as ValidLiteral),
          getValueType(t, constructor.amount as ValidLiteral)
        ),
      ])
    )

  if (constructor.xSpread != undefined)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleSprd", [
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
          getValueData(t, constructor.xSpread as ValidLiteral),
          getValueType(t, constructor.xSpread as ValidLiteral)
        ),
        getArgObject(
          t,
          2,
          getValueData(t, constructor.ySpread as ValidLiteral),
          getValueType(t, constructor.ySpread as ValidLiteral)
        ),
      ])
    )

  if (constructor.size != undefined)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleSize", [
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
          getValueData(t, constructor.size as ValidLiteral),
          getValueType(t, constructor.size as ValidLiteral)
        ),
        getArgObject(
          t,
          2,
          getValueData(t, constructor.sizeVariation as ValidLiteral),
          getValueType(t, constructor.sizeVariation as ValidLiteral)
        ),
      ])
    )

  if (constructor.material != undefined)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleMat", [
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
          getValueData(t, constructor.material as ValidLiteral),
          getValueType(t, constructor.material as ValidLiteral)
        ),
      ])
    )

  if (constructor.color != undefined)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleColor", [
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
          getValueData(t, constructor.color as ValidLiteral),
          getValueType(t, constructor.color as ValidLiteral)
        ),
        getArgObject(
          t,
          2,
          getValueData(t, constructor.colorVariation as ValidLiteral),
          getValueType(t, constructor.colorVariation as ValidLiteral)
        ),
      ])
    )

  if (constructor.opacity != undefined)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleOpac", [
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
          getValueData(t, constructor.opacity as ValidLiteral),
          getValueType(t, constructor.opacity as ValidLiteral)
        ),
      ])
    )

  if (constructor.motion != undefined)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleMotion", [
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
          getValueData(t, constructor.motion as ValidLiteral),
          getValueType(t, constructor.motion as ValidLiteral)
        ),
        getArgObject(
          t,
          2,
          getValueData(t, constructor.motionVariation as ValidLiteral),
          getValueType(t, constructor.motionVariation as ValidLiteral)
        ),
      ])
    )

  if (constructor.roll != undefined)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleRoll", [
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
          getValueData(t, constructor.roll as ValidLiteral),
          getValueType(t, constructor.roll as ValidLiteral)
        ),
      ])
    )

  if (constructor.fade != undefined)
    threadContents.push(
      getBlockObject(t, "set_var", "SetParticleFade", [
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
          getValueData(t, constructor.fade as ValidLiteral),
          getValueType(t, constructor.fade as ValidLiteral)
        ),
      ])
    )
}

import * as BabelTypes from "@babel/types"
import {
  flags,
  getLineVar,
  getTempName,
  parseObjectExpression,
} from "../util.js"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import Item from "./values/Item"
import Sound from "./values/Sound"
import Location from "./values/Location"
import PotionEffect from "./values/PotionEffect"
import GameValue from "./values/GameValue.js"
import Particle from "./values/Particle.js"
import Vector from "./values/Vector.js"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      if (flags.debug) console.log("NewExpression")
      const { callee, arguments: args } = path.node
      if (!t.isIdentifier(callee)) return
      const objectType = (callee as BabelTypes.Identifier).name

      const constructor = t.isObjectExpression(args[0])
        ? parseObjectExpression(t, args[0])
        : Object.entries(
            arrayParamsToObj(objectType, args as BabelTypes.Expression[])
          ).reduce(
            (acc, [key, value]) =>
              value !== null && value !== undefined
                ? { ...acc, [key]: value }
                : acc,
            {}
          )

      const tempVar = getTempName()

      switch (objectType) {
        case "Item":
          Item(t, threadContents, constructor, tempVar)
          break
        case "Sound":
          Sound(t, threadContents, constructor, tempVar)
          break
        case "Location":
          Location(t, threadContents, constructor, tempVar)
          break
        case "PotionEffect":
          PotionEffect(t, threadContents, constructor, tempVar)
          break
        case "GameValue":
          GameValue(t, threadContents, constructor, tempVar)
          break
        case "Particle":
          Particle(t, threadContents, constructor, tempVar)
          break
        case "Vector":
          Vector(t, threadContents, constructor, tempVar)
          break
      }

      path.replaceWith(getLineVar(t, tempVar))
    },
  } as VisitNode<PluginOptions, BabelTypes.NewExpression>)

function arrayParamsToObj(
  objectType: string,
  args: BabelTypes.Expression[]
): { [key: string]: BabelTypes.Expression } {
  switch (objectType) {
    case "Location":
      return {
        x: args[0],
        y: args[1],
        z: args[2],
        pitch: args[3],
        yaw: args[4],
      }
    case "Vector":
      return {
        x: args[0],
        y: args[1],
        z: args[2],
      }
    case "Item":
      return {
        material: args[0],
      }
    case "PotionEffect":
      return {
        type: args[0],
        amplifier: args[1],
        duration: args[2],
      }
    case "Sound":
      return {
        type: args[0],
        pitch: args[1],
        volume: args[2],
      }
    default:
      return {}
  }
}

import * as BabelTypes from "@babel/types"
import { flags, getLineVar, getTempName } from "../util.js"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import Item from "./values/Item"
import Sound from "./values/Sound"
import Location from "./values/Location"
import PotionEffect from "./values/PotionEffect"
import GameValue from "./values/GameValue.js"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      if (flags.debug) console.log("NewExpression")
      const { callee, arguments: args } = path.node
      if (!t.isIdentifier(callee) || !t.isObjectExpression(args[0])) return
      const objectType = (callee as BabelTypes.Identifier).name
      const constructor = args[0] as BabelTypes.ObjectExpression
      const sanitizedConstructor = constructor.properties.reduce(
        (acc, prop) => {
          const key = (
            (prop as BabelTypes.ObjectProperty).key as BabelTypes.Identifier
          ).name
          const value = (prop as BabelTypes.ObjectProperty)
            .value as BabelTypes.Expression
          acc[key] = value
          return acc
        },
        {} as { [key: string]: BabelTypes.Expression }
      )

      const tempVar = getTempName()

      switch (objectType) {
        case "Item":
          Item(t, threadContents, sanitizedConstructor, tempVar)
          break
        case "Sound":
          Sound(t, threadContents, sanitizedConstructor, tempVar)
          break
        case "Location":
          Location(t, threadContents, sanitizedConstructor, tempVar)
          break
        case "PotionEffect":
          PotionEffect(t, threadContents, sanitizedConstructor, tempVar)
          break
        case "GameValue":
          GameValue(t, threadContents, sanitizedConstructor, tempVar)
          break
      }

      path.replaceWith(getLineVar(t, tempVar))
    },
  } as VisitNode<PluginOptions, BabelTypes.NewExpression>)

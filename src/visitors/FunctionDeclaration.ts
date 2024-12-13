import * as BabelTypes from "@babel/types"
import { VisitNode } from "@babel/traverse"
import { PluginOptions } from "@babel/core"
import { getArgObject } from "../util"

const typeMappings = {
  String: "txt",
  StyledText: "comp",
  Number: "num",
  Location: "loc",
  Vector: "vec",
  Sound: "snd",
  Particle: "part",
  PotionEffect: "pot",
  Item: "item",
  Variable: "var",
  List: "list",
  Dictionary: "dict",
}

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
) =>
  ({
    exit(path) {
      const { params } = path.node as {
        params: BabelTypes.Identifier[]
      }

      if (process.env.debug) console.log("FunctionDeclaration")

      const argsWrapper = threadContents[0].properties.find(
        (p) =>
          ((p as BabelTypes.ObjectProperty).key as BabelTypes.StringLiteral)
            .value === "args"
      ) as BabelTypes.ObjectProperty
      if (!argsWrapper) return

      const itemsWrapper = (
        (argsWrapper.value as BabelTypes.ObjectExpression)
          .properties[0] as BabelTypes.ObjectProperty
      ).value as BabelTypes.ArrayExpression

      itemsWrapper.elements = params.map((param, i) => {
        return getArgObject(
          t,
          i,
          {
            name: param.name,
            type:
              typeMappings[
                (
                  (
                    (param.typeAnnotation as BabelTypes.TSTypeAnnotation)
                      ?.typeAnnotation as BabelTypes.TSTypeReference
                  )?.typeName as BabelTypes.Identifier
                )?.name as keyof typeof typeMappings
              ] ?? "any",
            plural: (param as unknown as any).plural ?? false,
            optional: param.optional ?? false,
          },
          "pn_el"
        )
      })
    },
  } as VisitNode<PluginOptions, BabelTypes.FunctionDeclaration>)

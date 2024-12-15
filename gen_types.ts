import generate from "@babel/generator"
import * as t from "@babel/types"
import { withType } from "./src/util"
const actionDump = require("./actiondump.json")
const materials = require("./materials.json")

const result = t.program([])

const namespaces = {
  PlayerAction: "PLAYER ACTION",
  SetVariable: "SET VARIABLE",
  EntityAction: "ENTITY ACTION",
  IfVariable: "IF VARIABLE",
  Control: "CONTROL",
  SelectObject: "SELECT OBJECT",
  Repeat: "REPEAT",
  GameAction: "GAME ACTION",
  IfGame: "IF GAME",
  IfEntity: "IF ENTITY",
  IfPlayer: "IF PLAYER",
}

const typeMappings = {
  ITEM: "Item",
  NUMBER: "Number",
  POTION: "PotionEffect",
  PARTICLE: "Particle",
  LOCATION: "Location",
  VECTOR: "Vector",
  TEXT: "String",
  COMPONENT: "StyledText",
  SOUND: "Sound",
  VARIABLE: "Variable",
}

const scopes = ["Game", "Save", "Line", "Local"]

const threadStarters = ["PlayerEvent", "Function", "Process"]

const targets = [
  "Default",
  "Selection",
  "Killer",
  "Damager",
  "Victim",
  "Shooter",
  "Projectile",
  "LastEntity",
]

for (const type of [...scopes, ...threadStarters]) {
  const aliasDeclaration = t.tsTypeAliasDeclaration(
    t.identifier(type),
    null,
    t.tsAnyKeyword()
  )
  t.addComment(aliasDeclaration, "leading", "@ts-ignore") // Avoid duplicate type errors from other npm packages
  result.body.push(aliasDeclaration)
}

function getItemClassDeclaration(
  className: string,
  properties: { [key: string]: t.TSType }
) {
  const paramIdentifier = t.identifier("data")
  paramIdentifier.typeAnnotation = t.tsTypeAnnotation(
    t.tsTypeLiteral(
      Object.entries(properties).map(([key, value]) => {
        const propertySignature = t.tsPropertySignature(
          t.identifier(key.endsWith("?") ? key.slice(0, -1) : key),
          t.tsTypeAnnotation(value)
        )

        if (key.endsWith("?")) propertySignature.optional = true
        return propertySignature
      })
    )
  )

  const classDeclaration = t.classDeclaration(
    t.identifier(className),
    null,
    t.classBody([
      t.tsDeclareMethod(null, t.identifier("constructor"), null, [
        paramIdentifier,
      ]),
    ])
  )

  classDeclaration.declare = true
  return classDeclaration
}

const itemClassProperties = {
  GameValue: {
    type: t.tsUnionType(
      actionDump.gameValues.map((gv) =>
        t.tsLiteralType(t.stringLiteral(gv.icon.name))
      )
    ),
    "target?": t.tsUnionType(
      targets.map((target) => t.tsLiteralType(t.stringLiteral(target)))
    ),
  },
  Item: {
    material: t.tsUnionType(
      materials.map((material) => t.tsLiteralType(t.stringLiteral(material)))
    ),
    "name?": t.tsTypeReference(t.identifier("StyledText")),
    "lore?": t.tsArrayType(t.tsTypeReference(t.identifier("StyledText"))),
    "amount?": t.tsNumberKeyword(),
    "tags?": t.tsTypeLiteral([
      withType(
        t,
        t.tsIndexSignature([
          withType(t, t.identifier("tag"), t.tsStringKeyword()) as t.Identifier,
        ]),
        t.tsUnionType([t.tsStringKeyword(), t.tsNumberKeyword()])
      ) as t.TSIndexSignature,
    ]),
  },
  Location: {
    x: t.tsNumberKeyword(),
    y: t.tsNumberKeyword(),
    z: t.tsNumberKeyword(),
    "pitch?": t.tsNumberKeyword(),
    "yaw?": t.tsNumberKeyword(),
  },
  Vector: {
    x: t.tsNumberKeyword(),
    y: t.tsNumberKeyword(),
    z: t.tsNumberKeyword(),
  },
  Sound: {
    type: t.tsUnionType(
      actionDump.sounds.map((sound) =>
        t.tsLiteralType(t.stringLiteral(sound.icon.name))
      )
    ),
    "pitch?": t.tsNumberKeyword(),
    "volume?": t.tsNumberKeyword(),
  },
} as { [key: string]: { [key: string]: t.TSType } }

for (const [key, value] of Object.entries(itemClassProperties)) {
  const classDeclaration = getItemClassDeclaration(key, value)
  t.addComment(classDeclaration, "leading", "@ts-ignore") // Avoid duplicate type errors from other npm packages
  result.body.push(classDeclaration)
}

const bannedSubstrings = [
  "LEGACY",
  "/",
  " ",
  "!",
  "=",
  "%",
  "+",
  "-",
  "*",
  ">",
  "<",
  " ",
]

for (const [key, value] of Object.entries(namespaces)) {
  const moduleDeclaration = t.tsModuleDeclaration(
    t.identifier(key),
    t.tsModuleBlock(
      actionDump.actions
        .filter(
          (b) =>
            b.codeblockName === value &&
            !bannedSubstrings.some((ban) => b.name.includes(ban)) &&
            b.icon.name !== ""
        )
        .map((action) => {
          action.name = action.name.replace(/ /g, "")
          const finalReturnType = t.tsTypeAnnotation(
            action.icon.returnValues?.length &&
              typeMappings[action.icon.returnValues[0].type]
              ? t.tsTypeReference(
                  t.identifier(typeMappings[action.icon.returnValues[0].type])
                )
              : value === "REPEAT"
              ? t.tsBooleanKeyword()
              : t.tsVoidKeyword()
          )

          return t.tsDeclareFunction(
            t.identifier(action.name),
            null,
            [
              ...(action.icon.arguments
                ?.filter((arg) => Boolean(typeMappings[arg.type]))
                .map((arg, i) => {
                  const identifier = t.identifier(`arg${i + 1}`)

                  const mainType = arg.type
                    ? t.tsTypeReference(t.identifier(typeMappings[arg.type]))
                    : t.tsAnyKeyword()
                  identifier.typeAnnotation = t.tsTypeAnnotation(
                    arg.optional
                      ? t.tsUnionType([mainType, t.tsNullKeyword()])
                      : mainType
                  )
                  if (arg.plural)
                    identifier.typeAnnotation.typeAnnotation = t.tsArrayType(
                      identifier.typeAnnotation.typeAnnotation
                    )

                  return arg.plural && i == action.icon.arguments.length - 1
                    ? t.restElement(identifier)
                    : identifier
                }) ?? []),
            ],
            t.tsTypeAnnotation(
              t.tsFunctionType(
                null,
                [
                  withType(
                    t,
                    t.identifier("tags"),
                    t.tsTypeLiteral(
                      action.tags.map((tag) =>
                        withType(
                          t,
                          t.tsPropertySignature(t.stringLiteral(tag.name)),
                          t.tsUnionType(
                            tag.options.map((option) =>
                              t.tsLiteralType(t.stringLiteral(option.name))
                            )
                          ),
                          true
                        )
                      )
                    )
                  ) as t.Identifier,
                ],
                finalReturnType
              )
            )
          )
        })
    )
  )

  moduleDeclaration.declare = true
  result.body.push(moduleDeclaration)
}

const fs = require("fs")
fs.writeFileSync("./types.d.ts", generate(result).code)

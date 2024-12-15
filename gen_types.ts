import generate from "@babel/generator"
import * as t from "@babel/types"
const actionDump = require("./actiondump.json")

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

const threadStarters = ["PlayerEvent", "Function", "Process"]

for (const type of Object.values(typeMappings).concat(threadStarters)) {
  const aliasDeclaration = t.tsTypeAliasDeclaration(
    t.identifier(type),
    null,
    t.tsAnyKeyword()
  )
  t.addComment(aliasDeclaration, "leading", "@ts-ignore") // Avoid duplicate type errors from other npm packages
  result.body.push(aliasDeclaration)
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
]

for (const [key, value] of Object.entries(namespaces)) {
  const moduleDeclaration = t.tsModuleDeclaration(
    t.identifier(key),
    t.tsModuleBlock(
      actionDump
        .filter(
          (b) =>
            b.codeblockName === value &&
            !bannedSubstrings.some((ban) => b.name.includes(ban))
        )
        .map((action) =>
          t.tsDeclareFunction(
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

                  return identifier
                }) ?? []),
            ],
            t.tsTypeAnnotation(
              action.icon.returnValues?.length &&
                typeMappings[action.icon.returnValues[0].type]
                ? t.tsTypeReference(
                    t.identifier(typeMappings[action.icon.returnValues[0].type])
                  )
                : t.tsVoidKeyword()
            )
          )
        )
    )
  )

  moduleDeclaration.declare = true
  result.body.push(moduleDeclaration)
}

const fs = require("fs")
fs.writeFileSync("./types.d.ts", generate(result).code)

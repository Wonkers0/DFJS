import * as BabelTypes from "@babel/types"
const actionDump = require("../actiondump.json").actions

export const { values: flags } = parseArgs({
  args: process.argv,
  options: {
    debug: {
      type: "boolean",
      default: false,
    },
    codeclient: {
      type: "boolean",
      default: true,
    },
    plot: {
      type: "string",
      default: "basic",
    },
    nosplitting: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
})

import {
  ArrayExpression,
  Identifier,
  Literal,
  NullLiteral,
  ObjectExpression,
  RegExpLiteral,
  TemplateLiteral,
} from "../node_modules/@babel/types/lib/index"

import { nanoid } from "nanoid"
import { parseArgs } from "node:util"

export type ValidLiteral = Exclude<
  Literal,
  NullLiteral | RegExpLiteral | TemplateLiteral
>
// These excluded types will be parsed by visitors before being processed here 👆
export function getValue(
  t: typeof BabelTypes,
  value: ValidLiteral | Identifier
) {
  if (t.isIdentifier(value)) return (value as Identifier).name
  else return (value as ValidLiteral).value
}

export function getVarScope(identifier: Identifier) {
  // Mapping of variable type annotations to internal variable scope names
  // Courtesy of https://github.com/UserUNP/sparkscript/blob/master/src/values/Variable.ts
  const varScopes = {
    local: "local",
    game: "unsaved",
    save: "saved",
    line: "line",
  }

  //@ts-ignore I cannot figure out babel types to save my life
  // prettier-ignore
  const scope = identifier.typeAnnotation?.typeAnnotation?.typeName?.name?.toLowerCase() ?? "line"
  if (varScopes[scope as keyof typeof varScopes] == null)
    throw new Error(
      `Variable scope ${scope} is not recognized. Acceptable scope values are: ${Object.keys(
        varScopes
      )}`
    )
  return varScopes[scope as keyof typeof varScopes]
}

export function getLineVar(t: typeof BabelTypes, name: string) {
  return withType(
    t,
    t.identifier(name),
    t.tsTypeReference(t.identifier("line"))
  )
}

export function getElseObject(t: typeof BabelTypes) {
  return t.objectExpression([
    t.objectProperty(t.stringLiteral("id"), t.stringLiteral("block")),
    t.objectProperty(t.stringLiteral("block"), t.stringLiteral("else")),
  ])
}

export function parseObjectExpression(
  t: typeof BabelTypes,
  expression: ObjectExpression
) {
  return expression.properties.reduce((acc, prop) => {
    const key = (prop as BabelTypes.ObjectProperty).key
    const resolvedKey = t.isStringLiteral(key)
      ? key.value
      : (key as Identifier).name
    const value = (prop as BabelTypes.ObjectProperty)
      .value as BabelTypes.Expression
    acc[resolvedKey] = value
    return acc
  }, {} as { [key: string]: BabelTypes.Expression })
}

export function getTempName() {
  return `DFJS_${nanoid()}`
}

const blockNameMappings = {
  "IF VARIABLE": "if_var",
  "SET VARIABLE": "set_var",
}

export function getBlockTags(
  t: typeof BabelTypes,
  blockType: string,
  blockAction: string,
  tagValues: { [tag: string]: string }
) {
  const tags = (actionDump as any).find(
    (block: any) =>
      (block.codeblockName.toLowerCase().split(" ").join("_") == blockType ||
        blockNameMappings[
          block.codeblockName as keyof typeof blockNameMappings
        ] == blockType) &&
      (block.name == blockAction || block.name == "dynamic")
  )?.tags
  if (!tags) return []

  return tags
    .map((tag: any, i: number) =>
      getArgObject(
        t,
        tag.slot,
        {
          option: tagValues[tag.name] ?? tag.defaultOption,
          tag: tag.name,
          action: blockType == "start_process" ? "dynamic" : blockAction,
          block: blockType,
        },
        "bl_tag"
      )
    )
    .reverse()
}

export function getBlockObject(
  t: typeof BabelTypes,
  blockType: string,
  blockAction: string,
  args: any[] = [],
  customAttributes: { [key: string]: any } = {},
  tagValues: { [tag: string]: string } = {}
) {
  const tags = getBlockTags(t, blockType, blockAction, tagValues)

  return t.objectExpression([
    t.objectProperty(t.stringLiteral("id"), t.stringLiteral("block")),
    t.objectProperty(t.stringLiteral("block"), t.stringLiteral(blockType)),
    t.objectProperty(
      t.stringLiteral("args"),
      t.objectExpression([
        t.objectProperty(
          t.stringLiteral("items"),
          t.arrayExpression([...args, ...tags])
        ),
      ])
    ),
    t.objectProperty(t.stringLiteral("action"), t.stringLiteral(blockAction)),
    ...Object.entries(customAttributes).map(([key, value]) =>
      t.objectProperty(t.stringLiteral(key), value)
    ),
  ])
}

export function getBracketObject(
  t: typeof BabelTypes,
  type: "norm" | "sticky",
  open: boolean
) {
  return t.objectExpression([
    t.objectProperty(t.stringLiteral("id"), t.stringLiteral("bracket")),
    t.objectProperty(t.stringLiteral("type"), t.stringLiteral(type)),
    t.objectProperty(
      t.stringLiteral("direct"),
      t.stringLiteral(open ? "open" : "close")
    ),
  ])
}

export function getArgObject(
  t: typeof BabelTypes,
  slot: number,
  data: object,
  type: string
) {
  // 'data' here should be JSON not a babel expression, it gets parsed anyway in this function 👇
  return t.objectExpression([
    t.objectProperty(
      t.stringLiteral("item"),
      t.objectExpression([
        t.objectProperty(t.stringLiteral("data"), parseValueToLiteral(t, data)), // data such as e.g. var name & scope
        t.objectProperty(t.stringLiteral("id"), t.stringLiteral(type)),
      ])
    ),
    t.objectProperty(t.stringLiteral("slot"), t.numericLiteral(slot)), // The slot that this argument is in the chest
  ])
}

export function getValueData(
  t: typeof BabelTypes,
  value: ValidLiteral | Identifier
) {
  return {
    name: getValue(t, value),
    ...(t.isIdentifier(value)
      ? {
          scope: (value as Identifier).typeAnnotation
            ? getVarScope(value as Identifier)
            : "line",
        }
      : {}),
  }
}

export function getValueType(
  t: typeof BabelTypes,
  value: ValidLiteral | Identifier
) {
  // Get df value (such as "txt", "num", "var", etc.) from babel object (such as stringLiteral)
  if (t.isStringLiteral(value)) {
    return (value as unknown as any).typeAnnotation?.typeAnnotation?.typeName
      ?.name === "StyledText"
      ? "comp"
      : "txt"
  } else if (t.isNumericLiteral(value)) {
    return "num"
  } else if (t.isIdentifier(value)) {
    return "var"
  } // ... more types (TO DO)
  else {
    throw new Error("Unsupported value type: " + value.type)
  }
}

export function parseValueToLiteral(
  t: typeof BabelTypes,
  value: any
): Literal | ArrayExpression | ObjectExpression {
  // Generated by ChatGPT 🤠
  // This is pretty self-explanatory though (I hope)
  if (typeof value === "number") {
    return t.numericLiteral(value)
  } else if (typeof value === "string") {
    return t.stringLiteral(value)
  } else if (typeof value === "boolean") {
    return t.booleanLiteral(value)
  } else if (Array.isArray(value)) {
    return t.arrayExpression(
      value.map((value) => parseValueToLiteral(t, value))
    )
  } else if (typeof value === "object") {
    const properties = Object.entries(value).map(([key, val]) => {
      const keyNode = t.stringLiteral(key)
      const valNode = parseValueToLiteral(t, val)
      return t.objectProperty(keyNode, valNode)
    })
    return t.objectExpression(properties)
  }

  throw new Error("Unsupported value type: " + typeof value)
}

const booleanOperators = ["==", "===", "!=", "!==", ">", "<", ">=", "<="]
export function isBooleanContext(
  t: typeof BabelTypes,
  init: BabelTypes.Expression | null | undefined
) {
  if (t.isBinaryExpression(init) && booleanOperators.includes(init.operator))
    return true
  if (t.isCallExpression(init)) {
    const callExp = init as BabelTypes.CallExpression
    if (t.isMemberExpression(callExp.callee)) {
      const memberExp = callExp.callee as BabelTypes.MemberExpression
      if (
        t.isIdentifier(memberExp.object) &&
        memberExp.object.name.includes("If")
      )
        return true
    }
  }

  return t.isUnaryExpression(init)
}

export function withType(
  t: typeof BabelTypes,
  node: BabelTypes.Node,
  type: BabelTypes.TSType,
  optional: boolean | null = null
): BabelTypes.Node {
  // @ts-ignore
  node.typeAnnotation = t.tsTypeAnnotation(type)
  // @ts-ignore
  if (optional != null) node.optional = optional
  return node
}

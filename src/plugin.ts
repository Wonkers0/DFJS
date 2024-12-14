import * as BabelTypes from "@babel/types"
import visitors from "./visitors.js"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  parseValueToLiteral,
  flags,
  getTempName,
} from "./util"
import { PluginOptions, Visitor, types } from "@babel/core"
import FunctionDeclarationVisitor from "./visitors/FunctionDeclaration"

export interface Babel {
  types: typeof BabelTypes
}

// Mapping of function types to internal event code block types
export const actionBlocks = {
  PlayerEvent: "event",
  PlayerAction: "player_action",
  SetVariable: "set_var",
  GameAction: "game_action",
  IfPlayer: "if_player",
  IfVariable: "if_var",
  IfGame: "if_game",
  Repeat: "repeat",
  Control: "control",
  EntityAction: "entity_action",
  CallFunction: "call_func",
  SelectObject: "select_obj",
  StartProcess: "start_process",
  Else: "else",
  IfEntity: "if_entity",
  Function: "func",
  Process: "process",
}

export default function ({ types: t }: Babel): {
  visitor: Visitor<PluginOptions>
} {
  return {
    visitor: {
      FunctionDeclaration(path) {
        const { id, returnType } = path.node
        if (id == null)
          throw new Error(
            "Internal Error: Cannot find 'id' field on the following node: " +
              path.node
          )

        // prettier-ignore
        // @ts-ignore Get function type in user's code (e.g. function Join(): *PlayerEvent* 👈 See we're getting this thing)
        const returnTypeId: string = returnType?.typeAnnotation?.typeName?.name ?? "Function"

        // Get equivalent diamondfire id
        const eventType: string | undefined =
          actionBlocks[returnTypeId as keyof typeof actionBlocks]
        if (!eventType)
          // If there's no valid mapping then throw an error 😔
          throw new Error(
            `Could not identify the event type of a function. Return type "${returnTypeId}" did not map to a valid event type.`
          )

        // This array will hold all of the objects in this function / soon-to-be DiamondFire thread
        // We initialize it with only the event / function block object
        const threadContents = [
          getBlockObject(
            t,
            eventType,
            id.name,
            [],
            eventType === "func" || eventType === "process"
              ? {
                  data: t.stringLiteral(id.name),
                }
              : {}
          ),
        ]

        // Traverse the function to gather the objects inside the function
        path.traverse(visitors(t, threadContents) as Visitor<unknown>)
        // @ts-ignore EXTREMELY illegal but it works 💀
        FunctionDeclarationVisitor(t, threadContents).exit(path)

        // Split the thread into chunks to make sure it fits in the plot's codespace
        const threadChunks = splitThread(t, threadContents)

        // This is the root object of the diamondfire template
        const threadObjects = threadChunks.map((thread) =>
          t.objectExpression([
            t.objectProperty(
              t.stringLiteral("blocks"),
              t.arrayExpression(thread)
            ),
          ])
        )

        // Final step!!! Replace the original code with the threadObjects defined above
        path.replaceWith(t.arrayExpression(threadObjects))
        path.skip() // Do not traverse the new node
      },
      Program: {
        exit(path) {
          // The body of the program is made up of array statements (each array statement is a thread)
          // e.g. []; []; [] ... etc.
          // These statements need to be grouped under a single array
          // e.g. [ [], [], [] ... etc. ]

          path.node.body = [
            t.expressionStatement(
              t.arrayExpression(
                path.node.body.map(
                  (arrExp) =>
                    (arrExp as BabelTypes.ExpressionStatement)
                      .expression as BabelTypes.ArrayExpression
                )
              )
            ),
          ]
        },
      },
    },
  }
}

function splitThread(t: typeof BabelTypes, threadContents: any[]) {
  const plotSizes = {
    basic: 50,
    large: 100,
    massive: 300,
    mega: 1000,
  }

  const maxCodeBlocks =
    (plotSizes[flags.plot as keyof typeof plotSizes] ?? 50) / 2 - 1

  if (threadContents.length < maxCodeBlocks || flags.nosplitting)
    return [threadContents]
  // Split the list into lists of length plotSize
  const threadChunks: (typeof threadContents)[] = []
  let funcName = getTempName()
  for (let i = 0; i < threadContents.length; i += maxCodeBlocks) {
    const slice = threadContents.slice(i, i + maxCodeBlocks)

    // Check first if it's not the last slice in the thread
    if (i + maxCodeBlocks < threadContents.length) {
      slice.push(
        getBlockObject(t, "call_func", "", [], {
          data: t.stringLiteral(funcName),
        })
      )
    }

    if (threadChunks.length != 0) {
      slice.unshift(
        getBlockObject(t, "func", funcName, [], {
          data: t.stringLiteral(funcName),
        })
      )

      funcName = getTempName()
    }

    threadChunks.push(slice)
  }

  return threadChunks
}

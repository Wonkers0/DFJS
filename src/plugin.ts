import * as BabelTypes from "@babel/types"
import visitors from "./visitors.js"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  parseValueToLiteral,
} from "./util"
import { PluginOptions, Visitor, types } from "@babel/core"

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
        path.parentPath.traverse(
          visitors(t, threadContents) as Visitor<unknown>
        )

        // This is the root object of the diamondfire template
        const threadObject = t.objectExpression([
          t.objectProperty(
            t.stringLiteral("blocks"),
            t.arrayExpression(threadContents)
          ),
        ])

        // Final step!!! Replace the original code with the threadObject defined above
        path.replaceWith(threadObject)
        path.skip() // Do not traverse the new node
      },
    },
  }
}

import * as BabelTypes from "@babel/types"
import visitors from "./visitors.js"
import {
  getBlockObject,
  getArgObject,
  getValueType,
  parseValueToLiteral,
} from "./util.js"
import { PluginOptions, Visitor, types } from "@babel/core"

export interface Babel {
  types: typeof BabelTypes
}

export default function ({ types: t }: Babel): {
  visitor: Visitor<PluginOptions>
} {
  return {
    visitor: {
      FunctionDeclaration(path) {
        const { id, returnType } = path.node
        if (id == null || returnType == null)
          throw new Error(
            "Internal Error: Cannot find 'id' or 'returnType' fields on the following node: " +
              path.node
          )

        // Mapping of function types to internal event code block types
        const eventBlocks = {
          PlayerEvent: "event",
          // ...
        }
        // @ts-ignore Get function type in user's code (e.g. function Join(): *PlayerEvent* 👈 See we're getting this thing)
        const returnTypeId: string = returnType.typeAnnotation.typeName.name

        // Get equivalent diamondfire id
        const eventType: string | undefined =
          eventBlocks[returnTypeId as keyof typeof eventBlocks]
        if (!eventType)
          // If there's no valid mapping then throw an error 😔
          throw new Error(
            `Could not identify the event type of a function. Return type "${returnTypeId}" did not map to a valid event type.`
          )

        // This array will hold all of the objects in this function / soon-to-be DiamondFire thread
        const threadContents = [getBlockObject(t, eventType, id.name)] // We initialize it with only the event / function block object

        // Traverse the function to gather the objects inside the function
        path.traverse(visitors(t, threadContents) as Visitor<unknown>)

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

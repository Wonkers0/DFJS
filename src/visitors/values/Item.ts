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
  threadContents.push(
    getBlockObject(t, "set_var", "SetItemType", [
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

  if (constructor.name)
    threadContents.push(
      getBlockObject(t, "set_var", "SetItemName", [
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
          getValueData(t, constructor.name as ValidLiteral),
          getValueType(t, constructor.name as ValidLiteral)
        ),
      ])
    )

  if (constructor.lore)
    threadContents.push(
      getBlockObject(t, "set_var", "SetItemLore", [
        getArgObject(
          t,
          0,
          {
            name: varName,
            scope: "line",
          },
          "var"
        ),
        // Lore array is traversed and moved to CreateList block, constructor.lore becomes identifier
        getArgObject(
          t,
          1,
          getValueData(t, constructor.lore as BabelTypes.Identifier),
          getValueType(t, constructor.lore as BabelTypes.Identifier)
        ),
      ])
    )

  if (constructor.amount)
    threadContents.push(
      getBlockObject(t, "set_var", "SetItemAmount", [
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
}

import * as BabelTypes from "@babel/types"

import { PluginOptions, Visitor } from "@babel/core"
import BinaryExpVisitor from "./visitors/BinaryExpression"
import VarDeclaratorVisitor from "./visitors/VariableDeclarator"
import TypescriptAsExpVisitor from "./visitors/TSAsExpression"
import CallExpVisitor from "./visitors/CallExpression"
import BlockVisitor from "./visitors/Block"
import NewExpVisitor from "./visitors/NewExpression"
import ArrayExpVisitor from "./visitors/ArrayExpression"
import AssignmentExpVisitor from "./visitors/AssignmentExpression"
import IdentifierVisitor from "./visitors/Identifier"
import ForOfStatementVisitor from "./visitors/ForOfStatement"
import UnaryExpVisitor from "./visitors/UnaryExpression"
import ArrayTypeVisitor from "./visitors/TSArrayType"
import FunctionDeclarationVisitor from "./visitors/FunctionDeclaration"
import AnyTypeAnnotationVisitor from "./visitors/AnyTypeAnnotation"

export default (
  t: typeof BabelTypes,
  threadContents: BabelTypes.ObjectExpression[]
): Visitor<PluginOptions> => ({
  VariableDeclarator: VarDeclaratorVisitor(t, threadContents),
  BinaryExpression: BinaryExpVisitor(t, threadContents),
  TSAsExpression: TypescriptAsExpVisitor(t, threadContents),
  CallExpression: CallExpVisitor(t, threadContents),
  Block: BlockVisitor(t, threadContents),
  NewExpression: NewExpVisitor(t, threadContents),
  ArrayExpression: ArrayExpVisitor(t, threadContents),
  AssignmentExpression: AssignmentExpVisitor(t, threadContents),
  Identifier: IdentifierVisitor(t, threadContents),
  ForOfStatement: ForOfStatementVisitor(t, threadContents),
  UnaryExpression: UnaryExpVisitor(t, threadContents),
  TSArrayType: ArrayTypeVisitor(t, threadContents),
  FunctionDeclaration: FunctionDeclarationVisitor(t, threadContents),
  AnyTypeAnnotation: AnyTypeAnnotationVisitor(t, threadContents),
})

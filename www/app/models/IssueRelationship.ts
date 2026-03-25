import { Type } from "class-transformer"
import * as t from "@/lib/transforms"
import { Member } from "./Member"
import { Issue } from "./Issue"
import type { OmitByValue } from "utility-types"
import type { IssueRelationshipSchema } from './schema/issue_relationship'

export class IssueRelationship implements IssueRelationshipSchema {
  id!: number
  targetId!: number
  sourceId!: number
  memberId!: number
  category!: string

  @Type(() => Issue)
  target!: Issue

  @Type(() => Issue)
  source!: Issue

  @Type(() => Member)
  member!: Member

  @Type(() => Date)
  createdAt!: Date

  @Type(() => Date)
  updatedAt!: Date
}

export class IssueRelationshipBoxImpl {
  @t.Klass(IssueRelationship) issue_relationship!: IssueRelationship
}

export type IssueRelationshipBox = OmitByValue<IssueRelationshipBoxImpl, Function>
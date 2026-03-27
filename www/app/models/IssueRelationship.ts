import { Type } from "class-transformer"
import * as t from "@/lib/transforms"
import { Member } from "./Member"
import { Issue } from "./Issue"
import type { OmitByValue } from "utility-types"
import type { IssueRelationshipSchema } from './schema/issue_relationship'

export class IssueRelationship implements IssueRelationshipSchema {
  id!: number
  target_id!: number
  source_id!: number
  member_id!: number
  category!: string

  @Type(() => Issue)
  target!: Issue

  @Type(() => Issue)
  source!: Issue

  @Type(() => Member)
  member!: Member

  @Type(() => Date)
  created_at!: Date

  @Type(() => Date)
  updated_at!: Date
}

export class IssueRelationshipBoxImpl {
  @t.Klass(IssueRelationship) issue_relationship!: IssueRelationship
}

export type IssueRelationshipBox = OmitByValue<IssueRelationshipBoxImpl, Function>
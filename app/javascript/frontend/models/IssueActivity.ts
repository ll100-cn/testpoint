import { Type } from "class-transformer"
import { Member } from "./Member"
import * as t from '@/lib/transforms'
import { Category } from "./Category"
import { Milestone } from "./Milestone"
import { Project } from "./Project"
import type { IssueActivitySchema } from './schema/issue_activity'

export class IssueActivity implements IssueActivitySchema {
  @t.Number id!: number
  @t.Number issueId!: number
  @t.Number memberId!: number
  @t.String property!: string
  @t.String afterValue: string | null = null
  @t.String beforeValue: string | null = null

  @t.Klass(Member) member?: Member

  @t.Date createdAt!: Date
  @t.Date updatedAt!: Date

  @t.Klass(Category) beforeCategory?: Category
  @t.Klass(Category) afterCategory?: Category

  @t.Klass(Member) beforeCreator?: Member
  @t.Klass(Member) afterCreator?: Member

  @t.Klass(Member) beforeAssignee?: Member
  @t.Klass(Member) afterAssignee?: Member

  @t.Klass(Milestone) beforeMilestone?: Milestone
  @t.Klass(Milestone) afterMilestone?: Milestone

  @t.Klass(Project) beforeProject?: Project
  @t.Klass(Project) afterProject?: Project
}

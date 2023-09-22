import { Type } from "class-transformer"
import { Member } from "./Member"
import * as t from '@/lib/transforms'
import { Category } from "./Category"
import { Milestone } from "./Milestone"
import { Project } from "./Project"

export class IssueActivity {
  @t.Number id: number
  @t.Number issue_id: number
  @t.Number member_id: number
  @t.String property: string
  @t.String after_value: string
  @t.String before_value: string

  @t.Klass(Member) member: Member

  @t.Date created_at: Date
  @t.Date updated_at: Date

  @t.Klass(Category) before_category?: Category
  @t.Klass(Category) after_category?: Category

  @t.Klass(Member) before_creator?: Member
  @t.Klass(Member) after_creator?: Member

  @t.Klass(Member) before_assignee?: Member
  @t.Klass(Member) after_assignee?: Member

  @t.Klass(Milestone) before_milestone?: Milestone
  @t.Klass(Milestone) after_milestone?: Milestone

  @t.Klass(Project) before_project?: Project
  @t.Klass(Project) after_project?: Project
}

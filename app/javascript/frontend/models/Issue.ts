import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { Category } from "./Category"
import { Member } from "./Member"
import { Milestone } from "./Milestone"
import { Task } from "./Task"
import { Pagination } from "./Pagination"
import { IssueStat } from "./IssueStat"
import { IssueActivity } from "./IssueActivity"
import { IssueRelationship } from "./IssueRelationship"
import { Attachment } from "./Attachment"
import { Subscription } from "./Subscription"
import { IssueSurvey } from "./IssueSurvey"

export class Issue {
  id!: number
  title!: string
  content!: string
  state!: string
  state_text!: string

  stage!: string

  @Type(() => Date)
  created_at!: Date

  @Type(() => Date)
  updated_at!: Date

  project_id!: number
  project_name!: string

  @Type(() => Date)
  last_edited_at?: Date

  creator_id!: number
  assignee_id?: number
  priority!: string
  priority_text!: string
  task_id?: number
  category_id?: number
  archived_at?: string
  milestone_id?: number

  @Type(() => Milestone)
  milestone?: Milestone

  @Type(() => Member)
  creator!: Member

  @Type(() => Member)
  assignee?: Member

  @Type(() => Category)
  category?: Category

  @Type(() => Task)
  task?: Task

  titleWithPriority() {
    const prefix = this.priority == "important" ? "!!" : ""
    return `${prefix}${this.title}`
  }
}

export class IssueBox {
  @t.Klass(Issue) issue!: Issue

  @t.Klass(Attachment) attachments: Attachment[] = []
  @t.Klass(IssueSurvey) surveys: IssueSurvey[] = []
  @t.Klass(IssueActivity) activities: IssueActivity[] = []
  @t.Klass(IssueRelationship) source_relationships: IssueRelationship[] = []
  @t.Klass(IssueRelationship) target_relationships: IssueRelationship[] = []
  @t.Klass(Subscription) subscriptions: Subscription[] = []
}

export class IssuePage<Box extends IssueBox> extends Pagination<Box> {
  @Type(() => IssueBox) list: Box[] = []
  @Type(() => IssueStat) issue_stats!: IssueStat[]
}

export class IssueSummary {
  by_category: { category: Category, count: number }[] = []
  by_milestone: { milestone: Milestone, count: number }[] = []
  by_assignee: { assignee: Member, count: number }[] = []
  by_creator: { creator: Member, count: number }[] = []
}
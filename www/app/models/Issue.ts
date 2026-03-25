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
import type { OmitByValue } from "utility-types"
import type { IssueSchema } from './schema/issue'

export class Issue implements IssueSchema {
  id!: number
  title!: string
  content!: string
  state!: string
  stateText!: string

  stage!: string
  stageText!: string
  subscribedUsers?: unknown[]

  @Type(() => Date)
  createdAt!: Date

  @Type(() => Date)
  updatedAt!: Date

  projectId!: number
  projectName!: string

  @Type(() => Date)
  lastEditedAt?: Date

  creatorId!: number
  assigneeId?: number
  priority!: string
  priorityText!: string
  taskId?: number
  categoryId?: number
  @Type(() => Date)
  archivedAt?: Date
  milestoneId?: number

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

export class IssueBoxImpl {
  @t.Klass(Issue) issue!: Issue

  @t.Klass(Attachment) attachments: Attachment[] = []
  @t.Klass(IssueSurvey) surveys: IssueSurvey[] = []
  @t.Klass(IssueActivity) activities: IssueActivity[] = []
  @t.Klass(IssueRelationship) sourceRelationships: IssueRelationship[] = []
  @t.Klass(IssueRelationship) targetRelationships: IssueRelationship[] = []
  @t.Klass(Subscription) subscriptions: Subscription[] = []
}

export type IssueBox = OmitByValue<IssueBoxImpl, Function>

export class IssuePage<Box extends IssueBox> extends Pagination<Box> {
  @t.Klass(IssueBoxImpl) list: Box[] = []
  @t.Klass(IssueStat) issueStats!: IssueStat[]
}

export class IssueSummary {
  byCategory: { category: Category, count: number }[] = []
  byMilestone: { milestone: Milestone, count: number }[] = []
  byAssignee: { assignee: Member, count: number }[] = []
  byCreator: { creator: Member, count: number }[] = []
}
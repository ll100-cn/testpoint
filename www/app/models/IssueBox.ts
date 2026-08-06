import * as t from '@/lib/transforms'
import { Attachment } from './Attachment'
import { Issue } from './Issue'
import { IssueActivity } from './IssueActivity'
import { IssueRelationship } from './IssueRelationship'
import { IssueStat } from './IssueStat'
import { IssueSurvey } from './IssueSurvey'
import { Pagination } from './Pagination'
import { Subscription } from './Subscription'
import type { OmitByValue } from 'utility-types'

export class IssueBoxImpl {
  @t.Klass(Issue) issue!: Issue

  @t.Klass(Attachment) attachments: Attachment[] = []
  @t.Klass(IssueSurvey) surveys: IssueSurvey[] = []
  @t.Klass(IssueActivity) activities: IssueActivity[] = []
  @t.Klass(IssueRelationship) source_relationships: IssueRelationship[] = []
  @t.Klass(IssueRelationship) target_relationships: IssueRelationship[] = []
  @t.Klass(Subscription) subscriptions: Subscription[] = []
}

export type IssueBox = OmitByValue<IssueBoxImpl, Function>

export class IssuePage<Box extends IssueBox> extends Pagination<Box> {
  @t.Klass(IssueBoxImpl) list: Box[] = []
  @t.Klass(IssueStat) issue_stats!: IssueStat[]
}

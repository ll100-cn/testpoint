import * as t from "@/lib/transforms"
import { Issue } from "./Issue"
import { IssueSurvey } from "./IssueSurvey"
import { IssueActivity } from "./IssueActivity"
import { IssueRelationship } from "./IssueRelationship"
import { Attachment } from "./Attachment"
import { Subscription } from "./Subscription"

export class IssueInfo extends Issue {
  @t.Klass(Attachment) attachments: Attachment[]

  @t.Klass(IssueSurvey) surveys: IssueSurvey[]
  @t.Klass(IssueActivity) activities: IssueActivity[]
  @t.Klass(IssueRelationship) source_relationships: IssueRelationship[]
  @t.Klass(IssueRelationship) target_relationships: IssueRelationship[]
  @t.Klass(Subscription) subscriptions: Subscription[]
}

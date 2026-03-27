import { z } from 'zod'

import {
  createParser,
  DateTimeSchema,
  NullableInputStringSchema,
  NullableIntegerInputSchema,
  NullableIntegerSchema,
  NullableStringSchema,
} from './_shared'
import { CategorySchema } from './category'
import { MemberSchema } from './member'
import { MilestoneSchema } from './milestone'
import { ProjectSchema } from './project'
import { TaskSchema } from './task'
import { IssueStateSchema } from './issue_state'

function withIssueMethods<T extends { priority: string; title: string }>(issue: T) {
  return {
    ...issue,
    titleWithPriority() {
      return `${issue.priority === 'important' ? '!!' : ''}${issue.title}`
    },
  }
}

function withAttachmentMethods<T extends { content_type: string }>(attachment: T) {
  return {
    ...attachment,
    isImage() {
      return attachment.content_type.startsWith('image/')
    },
    isVideo() {
      return attachment.content_type.startsWith('video/') && attachment.content_type.includes('mp4')
    },
    isAudio() {
      return attachment.content_type.startsWith('audio/')
    },
  }
}

export const IssueSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: NullableStringSchema,
  state: z.string(),
  state_text: z.string(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
  project_id: z.number().int(),
  last_edited_at: DateTimeSchema.nullable().optional(),
  creator_id: z.number().int(),
  assignee_id: NullableIntegerSchema,
  priority: z.string(),
  priority_text: z.string(),
  task_id: NullableIntegerSchema,
  category_id: NullableIntegerSchema,
  archived_at: DateTimeSchema.nullable().optional(),
  milestone_id: NullableIntegerSchema,
  subscribed_users: z.array(z.unknown()).nullable().optional(),
  stage: z.string(),
  stage_text: z.string(),
  creator: MemberSchema,
  task: TaskSchema.optional(),
  milestone: MilestoneSchema.optional(),
  assignee: MemberSchema.optional(),
  category: CategorySchema.optional(),
  project_name: z.string(),
})

type IssueMethods = {
  titleWithPriority(): string
}

export type IssueType = Omit<z.output<typeof IssueSchema>, 'content'> & {
  content: string
} & IssueMethods

export function parseIssue(value: z.output<typeof IssueSchema>): IssueType {
  return withIssueMethods({
    ...value,
    content: value.content ?? '',
  })
}

export const AttachmentSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  updated_at: DateTimeSchema,
  content_type: z.string(),
  file_url: z.string(),
  file_size: z.number().int(),
  file_previewable: z.boolean(),
  file_preview_url: z.string().nullable().optional(),
})

type AttachmentMethods = {
  isImage(): boolean
  isVideo(): boolean
  isAudio(): boolean
}

export type AttachmentType = z.output<typeof AttachmentSchema> & AttachmentMethods

export function parseAttachment(value: z.output<typeof AttachmentSchema>): AttachmentType {
  return withAttachmentMethods(value)
}

export const IssueTemplateInputSchema = z.object({
  id: z.number().int(),
  label: z.string().nullable().optional(),
  order_index: NullableIntegerSchema,
  template_id: NullableIntegerSchema,
  created_at: DateTimeSchema.nullable().optional(),
  updated_at: DateTimeSchema.nullable().optional(),
})
export type IssueTemplateInputType = z.output<typeof IssueTemplateInputSchema>

export const IssueTemplateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  project_id: z.number().int(),
  lookup_by_build_form: z.boolean(),
  title_suggestion: z.string().nullable().optional(),
  content_suggestion: z.string().nullable().optional(),
  default_category_id: NullableIntegerSchema,
  default_priority: z.string(),
  default_priority_text: z.string(),
  default_category: CategorySchema.optional(),
  inputs: z.array(IssueTemplateInputSchema),
})
export type IssueTemplateType = z.output<typeof IssueTemplateSchema>

export const IssueSurveySchema = z.object({
  id: z.number().int(),
  issue_id: z.number().int(),
  template_id: z.number().int(),
  state: z.string(),
  values: z.record(z.string(), z.string().nullable()),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
  remark: z.string().nullable().optional(),
  template: IssueTemplateSchema,
})
export type IssueSurveyType = z.output<typeof IssueSurveySchema>

export const IssueActivitySchema = z.object({
  id: z.number().int(),
  issue_id: z.number().int(),
  member_id: z.number().int(),
  property: z.string(),
  before_value: z.string().nullable().optional(),
  after_value: z.string().nullable().optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
  member: MemberSchema.optional(),
  before_category: CategorySchema.optional(),
  after_category: CategorySchema.optional(),
  before_creator: MemberSchema.optional(),
  after_creator: MemberSchema.optional(),
  before_assignee: MemberSchema.optional(),
  after_assignee: MemberSchema.optional(),
  before_milestone: MilestoneSchema.optional(),
  after_milestone: MilestoneSchema.optional(),
  before_project: ProjectSchema.optional(),
  after_project: ProjectSchema.optional(),
})
export type IssueActivityType = z.output<typeof IssueActivitySchema>

export const SubscriptionSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  issue_id: z.number().int(),
  updated_at: DateTimeSchema,
  member: MemberSchema,
})
export type SubscriptionType = z.output<typeof SubscriptionSchema>

export const IssueRelationshipSchema: z.ZodType<any> = z.object({
  id: z.number().int(),
  target_id: z.number().int(),
  source_id: z.number().int(),
  member_id: z.number().int(),
  category: z.string().nullable().optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
  member: MemberSchema.optional(),
  target: z.lazy(() => IssueSchema).optional(),
  source: z.lazy(() => IssueSchema).optional(),
})

export type IssueRelationshipType = Omit<z.output<typeof IssueRelationshipSchema>, 'target' | 'source'> & {
  target?: IssueType
  source?: IssueType
}

export function parseIssueRelationship(value: z.output<typeof IssueRelationshipSchema>): IssueRelationshipType {
  return {
    ...value,
    target: value.target ? parseIssue(value.target) : undefined,
    source: value.source ? parseIssue(value.source) : undefined,
  }
}

const IssueBoxRawSchema = z.object({
  issue: IssueSchema,
  attachments: z.array(AttachmentSchema).optional().default([]),
  surveys: z.array(IssueSurveySchema).optional().default([]),
  activities: z.array(IssueActivitySchema).optional().default([]),
  source_relationships: z.array(IssueRelationshipSchema).optional().default([]),
  target_relationships: z.array(IssueRelationshipSchema).optional().default([]),
  subscriptions: z.array(SubscriptionSchema).optional().default([]),
})

export type IssueBoxType = {
  issue: IssueType
  attachments: AttachmentType[]
  surveys: IssueSurveyType[]
  activities: IssueActivityType[]
  source_relationships: IssueRelationshipType[]
  target_relationships: IssueRelationshipType[]
  subscriptions: SubscriptionType[]
}

export function parseIssueBox(value: z.output<typeof IssueBoxRawSchema>): IssueBoxType {
  return {
    issue: parseIssue(value.issue),
    attachments: value.attachments.map(parseAttachment),
    surveys: value.surveys,
    activities: value.activities,
    source_relationships: value.source_relationships.map(parseIssueRelationship),
    target_relationships: value.target_relationships.map(parseIssueRelationship),
    subscriptions: value.subscriptions,
  }
}

export const IssueBoxSchema = createParser(IssueBoxRawSchema, parseIssueBox)

export const IssueInfoBoxSchema = IssueBoxSchema
export type IssueInfoBoxType = IssueBoxType

const IssuePageWithCountsRawSchema = z.object({
  total_count: z.number().int(),
  offset: z.number().int(),
  limit: z.number().int(),
  list: z.array(IssueBoxRawSchema),
  issue_stats: z.array(IssueStateSchema).optional().default([]),
})

export type IssuePageWithCountsType = Omit<z.output<typeof IssuePageWithCountsRawSchema>, 'list'> & {
  list: IssueBoxType[]
}

export const IssuePageWithCountsSchema = createParser(IssuePageWithCountsRawSchema, (value) => ({
  ...value,
  list: value.list.map(parseIssueBox),
}))

function buildSummaryEntrySchema<Key extends string, Item extends z.ZodTypeAny>(key: Key, itemSchema: Item) {
  return z.object({
    [key]: itemSchema.nullable().optional(),
    count: z.number().int(),
  } as Record<Key | 'count', z.ZodTypeAny>) as any
}

export const IssueSummarySchema = z.object({
  by_category: z.array(buildSummaryEntrySchema('category', CategorySchema)),
  by_milestone: z.array(buildSummaryEntrySchema('milestone', MilestoneSchema)),
  by_assignee: z.array(buildSummaryEntrySchema('assignee', MemberSchema)),
  by_creator: z.array(buildSummaryEntrySchema('creator', MemberSchema)),
})
export type IssueSummaryType = z.output<typeof IssueSummarySchema>

export const IssueCreateBodySchema = z.object({
  issue_template_id: NullableIntegerInputSchema,
  issue_attributes: z.object({
    content: NullableInputStringSchema,
    title: NullableInputStringSchema,
    attachments_params: z.array(z.unknown()).default([]),
    creator_id: NullableIntegerInputSchema,
  }).passthrough(),
  survey_attributes: z.object({
    inputs_attributes: z.array(z.object({
      template_input_id: NullableIntegerInputSchema,
      value: NullableInputStringSchema,
    }).passthrough()).default([]),
  }).passthrough(),
}).passthrough()
export type IssueCreateBodyType = z.output<typeof IssueCreateBodySchema>

const IssueMergeBodyRawSchema = z.object({
  source_ids: z.array(NullableIntegerInputSchema),
}).passthrough()

export const IssueMergeBodySchema = createParser(IssueMergeBodyRawSchema, (value) => ({
  ...value,
  source_ids: value.source_ids.filter((item): item is number => item != null),
}))
export type IssueMergeBodyType = z.output<typeof IssueMergeBodyRawSchema>

export const IssueResolveBodySchema = z.object({
  action: z.enum(['resolve', 'unresolve']),
  comment_attributes: z.object({
    content: NullableInputStringSchema.optional(),
    attachment_ids: z.array(z.unknown()).optional(),
    attachment_params: z.array(z.unknown()).optional(),
  }).passthrough().optional(),
}).passthrough()
export type IssueResolveBodyType = z.output<typeof IssueResolveBodySchema>

export const IssueProcessBodySchema = z.object({
  state: z.string(),
}).passthrough()
export type IssueProcessBodyType = z.output<typeof IssueProcessBodySchema>

export const ProfileIssueQuerySchema = z.object({
  filter: z.enum(['created', 'subscribed', 'assigned', 'archived', 'unhandled']).optional(),
  sorts: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  per_page: z.coerce.number().int().positive().optional(),
}).passthrough()
export type ProfileIssueQueryType = z.output<typeof ProfileIssueQuerySchema>

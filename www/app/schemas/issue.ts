import { z } from 'zod'

import {
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

function withAttachmentMethods<T extends { contentType: string }>(attachment: T) {
  return {
    ...attachment,
    isImage() {
      return attachment.contentType.startsWith('image/')
    },
    isVideo() {
      return attachment.contentType.startsWith('video/') && attachment.contentType.includes('mp4')
    },
    isAudio() {
      return attachment.contentType.startsWith('audio/')
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
  last_edited_at: DateTimeSchema.nullable().optional().transform((value) => value ?? null),
  creator_id: z.number().int(),
  assignee_id: NullableIntegerSchema,
  priority: z.string(),
  priority_text: z.string(),
  task_id: NullableIntegerSchema,
  category_id: NullableIntegerSchema,
  archived_at: DateTimeSchema.nullable().optional().transform((value) => value ?? null),
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
}).transform((value) => withIssueMethods({
  id: value.id,
  title: value.title,
  content: value.content ?? '',
  state: value.state,
  stateText: value.state_text,
  createdAt: value.created_at,
  updatedAt: value.updated_at,
  projectId: value.project_id,
  lastEditedAt: value.last_edited_at ?? undefined,
  creatorId: value.creator_id,
  assigneeId: value.assignee_id ?? undefined,
  priority: value.priority,
  priorityText: value.priority_text,
  taskId: value.task_id ?? undefined,
  categoryId: value.category_id ?? undefined,
  archivedAt: value.archived_at ?? undefined,
  milestoneId: value.milestone_id ?? undefined,
  subscribedUsers: value.subscribed_users ?? undefined,
  stage: value.stage,
  stageText: value.stage_text,
  creator: value.creator,
  task: value.task,
  milestone: value.milestone,
  assignee: value.assignee,
  category: value.category,
  projectName: value.project_name,
}))
export type IssueType = z.output<typeof IssueSchema>

export const AttachmentSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  updated_at: DateTimeSchema,
  content_type: z.string(),
  file_url: z.string(),
  file_size: z.number().int(),
  file_previewable: z.boolean(),
  file_preview_url: z.string().nullable().optional(),
}).transform((value) => withAttachmentMethods({
  id: value.id,
  title: value.title,
  updatedAt: value.updated_at,
  contentType: value.content_type,
  fileUrl: value.file_url,
  fileSize: value.file_size,
  filePreviewable: value.file_previewable,
  ...(value.file_preview_url ? { filePreviewUrl: value.file_preview_url } : {}),
}))
export type AttachmentType = z.output<typeof AttachmentSchema>

export const IssueTemplateInputSchema = z.object({
  id: z.number().int(),
  label: z.string().nullable().optional(),
  order_index: NullableIntegerSchema,
  template_id: NullableIntegerSchema,
  created_at: DateTimeSchema.nullable().optional(),
  updated_at: DateTimeSchema.nullable().optional(),
}).transform((value) => ({
  id: value.id,
  label: value.label ?? null,
  orderIndex: value.order_index ?? null,
  order_index: value.order_index ?? null,
  templateId: value.template_id ?? null,
  template_id: value.template_id ?? null,
  createdAt: value.created_at ?? null,
  created_at: value.created_at ?? null,
  updatedAt: value.updated_at ?? null,
  updated_at: value.updated_at ?? null,
}))
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
}).transform((value) => ({
  id: value.id,
  name: value.name,
  projectId: value.project_id,
  project_id: value.project_id,
  lookupByBuildForm: value.lookup_by_build_form,
  lookup_by_build_form: value.lookup_by_build_form,
  titleSuggestion: value.title_suggestion ?? null,
  title_suggestion: value.title_suggestion ?? null,
  contentSuggestion: value.content_suggestion ?? null,
  content_suggestion: value.content_suggestion ?? null,
  defaultCategoryId: value.default_category_id ?? null,
  default_category_id: value.default_category_id ?? null,
  defaultPriority: value.default_priority,
  default_priority: value.default_priority,
  defaultPriorityText: value.default_priority_text,
  default_priority_text: value.default_priority_text,
  defaultCategory: value.default_category,
  default_category: value.default_category,
  inputs: value.inputs,
}))
export type IssueTemplateType = z.output<typeof IssueTemplateSchema>

export const IssueSurveySchema = z.object({
  id: z.number().int(),
  issue_id: z.number().int(),
  template_id: z.number().int(),
  state: z.string(),
  values: z.record(z.string(), z.string().nullable()).transform((value) => value as Record<number, string>),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
  remark: z.string().nullable().optional(),
  template: IssueTemplateSchema,
}).transform((value) => ({
  id: value.id,
  issueId: value.issue_id,
  issue_id: value.issue_id,
  templateId: value.template_id,
  template_id: value.template_id,
  state: value.state,
  values: value.values,
  createdAt: value.created_at,
  created_at: value.created_at,
  updatedAt: value.updated_at,
  updated_at: value.updated_at,
  remark: value.remark ?? null,
  template: value.template,
}))
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
}).transform((value) => ({
  id: value.id,
  issueId: value.issue_id,
  memberId: value.member_id,
  property: value.property,
  beforeValue: value.before_value ?? null,
  afterValue: value.after_value ?? null,
  createdAt: value.created_at,
  updatedAt: value.updated_at,
  member: value.member,
  beforeCategory: value.before_category,
  afterCategory: value.after_category,
  beforeCreator: value.before_creator,
  afterCreator: value.after_creator,
  beforeAssignee: value.before_assignee,
  afterAssignee: value.after_assignee,
  beforeMilestone: value.before_milestone,
  afterMilestone: value.after_milestone,
  beforeProject: value.before_project,
  afterProject: value.after_project,
}))
export type IssueActivityType = z.output<typeof IssueActivitySchema>

export const SubscriptionSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  issue_id: z.number().int(),
  updated_at: DateTimeSchema,
  member: MemberSchema,
}).transform((value) => ({
  id: value.id,
  userId: value.user_id,
  issueId: value.issue_id,
  updatedAt: value.updated_at,
  member: value.member,
}))
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
}).transform((value) => ({
  id: value.id,
  targetId: value.target_id,
  sourceId: value.source_id,
  memberId: value.member_id,
  category: value.category ?? undefined,
  createdAt: value.created_at,
  updatedAt: value.updated_at,
  member: value.member,
  target: value.target,
  source: value.source,
}))
export type IssueRelationshipType = z.output<typeof IssueRelationshipSchema>

const IssueBoxRawSchema = z.object({
  issue: IssueSchema,
  attachments: z.array(AttachmentSchema).optional().default([]),
  surveys: z.array(IssueSurveySchema).optional().default([]),
  activities: z.array(IssueActivitySchema).optional().default([]),
  source_relationships: z.array(IssueRelationshipSchema).optional().default([]),
  target_relationships: z.array(IssueRelationshipSchema).optional().default([]),
  subscriptions: z.array(SubscriptionSchema).optional().default([]),
})

export const IssueBoxSchema = IssueBoxRawSchema.transform(({ source_relationships, target_relationships, ...rest }) => ({
  ...rest,
  sourceRelationships: source_relationships,
  targetRelationships: target_relationships,
}))
export type IssueBoxType = z.output<typeof IssueBoxSchema>

export const IssueInfoBoxSchema = IssueBoxSchema
export type IssueInfoBoxType = z.output<typeof IssueInfoBoxSchema>

export const IssuePageWithCountsSchema = z.object({
  total_count: z.number().int(),
  offset: z.number().int(),
  limit: z.number().int(),
  list: z.array(IssueBoxSchema),
  issue_stats: z.array(IssueStateSchema).optional(),
}).transform(({ total_count, offset, limit, list, issue_stats }) => ({
  list,
  offset,
  limit,
  totalCount: total_count,
  current_page: Math.floor(offset / limit) + 1,
  total_pages: total_count === 0 ? 1 : Math.ceil(total_count / limit),
  issueStats: issue_stats ?? [],
}))
export type IssuePageWithCountsType = z.output<typeof IssuePageWithCountsSchema>

function buildSummaryEntrySchema<Key extends string, Item extends z.ZodTypeAny>(key: Key, itemSchema: Item) {
  return z.object({
    [key]: itemSchema.nullable().optional(),
    count: z.number().int(),
  } as Record<Key | 'count', z.ZodTypeAny>).transform((value: any) => ({
    [key]: value[key] ?? null,
    count: value.count,
  })) as any
}

export const IssueSummarySchema = z.object({
  by_category: z.array(buildSummaryEntrySchema('category', CategorySchema)),
  by_milestone: z.array(buildSummaryEntrySchema('milestone', MilestoneSchema)),
  by_assignee: z.array(buildSummaryEntrySchema('assignee', MemberSchema)),
  by_creator: z.array(buildSummaryEntrySchema('creator', MemberSchema)),
}).transform((value) => ({
  byCategory: value.by_category,
  byMilestone: value.by_milestone,
  byAssignee: value.by_assignee,
  byCreator: value.by_creator,
}))
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

export const IssueMergeBodySchema = z.object({
  source_ids: z.array(NullableIntegerInputSchema).transform((values) => values.filter((value): value is number => value != null)),
}).passthrough()
export type IssueMergeBodyType = z.output<typeof IssueMergeBodySchema>

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

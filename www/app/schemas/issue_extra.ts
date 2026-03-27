import { z } from 'zod'

import { buildListParser, createParser, NullableBooleanInputSchema, NullableInputStringSchema, NullableIntegerInputSchema } from './_shared'
import {
  AttachmentSchema,
  IssueActivitySchema,
  IssueRelationshipSchema,
  IssueSchema,
  IssueSurveySchema,
  IssueTemplateSchema,
  parseAttachment,
  parseIssue,
  parseIssueRelationship,
  SubscriptionSchema,
  type AttachmentType,
  type IssueRelationshipType,
  type IssueType,
} from './issue'

const IssueActionBoxRawSchema = z.object({
  issue: IssueSchema,
  activities: z.array(IssueActivitySchema),
})
export type IssueActionBoxType = { issue: IssueType, activities: z.output<typeof IssueActivitySchema>[] }
export const IssueActionBoxSchema = createParser(IssueActionBoxRawSchema, ({ issue, activities }) => ({ issue: parseIssue(issue), activities }))

export const IssueActionBodySchema = z.object({
  title: NullableInputStringSchema.optional(),
  state: NullableInputStringSchema.optional(),
  priority: NullableInputStringSchema.optional(),
  creator_id: NullableIntegerInputSchema.optional(),
  assignee_id: NullableIntegerInputSchema.optional(),
  milestone_id: NullableIntegerInputSchema.optional(),
  category_id: NullableIntegerInputSchema.optional(),
}).passthrough()
export type IssueActionBodyType = z.output<typeof IssueActionBodySchema>

const IssueBodyBoxRawSchema = z.object({
  issue: IssueSchema,
  attachments: z.array(AttachmentSchema),
})
export type IssueBodyBoxType = { issue: IssueType, attachments: AttachmentType[] }
export const IssueBodyBoxSchema = createParser(IssueBodyBoxRawSchema, ({ issue, attachments }) => ({
  issue: parseIssue(issue),
  attachments: attachments.map(parseAttachment),
}))

export const IssueBodyBodySchema = z.object({
  content: NullableInputStringSchema.optional(),
  attachments_params: z.array(z.unknown()).optional(),
}).passthrough()
export type IssueBodyBodyType = z.output<typeof IssueBodyBodySchema>

export const AttachmentBodySchema = z.object({
  title: NullableInputStringSchema.optional(),
}).passthrough()
export type AttachmentBodyType = z.output<typeof AttachmentBodySchema>

const IssueRelationshipBoxRawSchema = z.object({
  issue_relationship: IssueRelationshipSchema,
})
export type IssueRelationshipBoxType = { issue_relationship: IssueRelationshipType }
export const IssueRelationshipBoxSchema = createParser(IssueRelationshipBoxRawSchema, ({ issue_relationship }) => ({
  issue_relationship: parseIssueRelationship(issue_relationship),
}))

export const IssueRelationshipBodySchema = z.object({
  target_id: NullableIntegerInputSchema.optional(),
  creator_subscribe_target_issue: NullableBooleanInputSchema.optional(),
}).passthrough()
export type IssueRelationshipBodyType = z.output<typeof IssueRelationshipBodySchema>

export const IssueSurveyBoxSchema = z.object({
  issue_survey: IssueSurveySchema,
})
export type IssueSurveyBoxType = z.output<typeof IssueSurveyBoxSchema>

export const IssueSurveyListSchema = buildListParser(IssueSurveyBoxSchema)
export type IssueSurveyListType = IssueSurveyBoxType[]

const IssueSurveyBodyRawSchema = z.any()

export const IssueSurveyBodySchema = createParser(IssueSurveyBodyRawSchema, (input: any) => ({
  template_id: input?.template_id ?? null,
  remark: input?.remark ?? null,
  inputs_attributes: (input?.inputs_attributes ?? []).map((item: any) => ({
    template_input_id: item?.template_input_id ?? null,
    value: item?.value ?? null,
  })),
}))
export type IssueSurveyBodyType = any

export const SubscriptionBoxSchema = z.object({
  subscription: SubscriptionSchema,
})
export type SubscriptionBoxType = z.output<typeof SubscriptionBoxSchema>

export const IssueTemplateBoxSchema = z.object({
  issue_template: IssueTemplateSchema,
})
export type IssueTemplateBoxType = z.output<typeof IssueTemplateBoxSchema>

export const IssueTemplateListSchema = buildListParser(IssueTemplateBoxSchema)
export type IssueTemplateListType = IssueTemplateBoxType[]

const IssueTemplateBodyRawSchema = z.any()

export const IssueTemplateBodySchema = createParser(IssueTemplateBodyRawSchema, (input: any) => ({
  name: input?.name ?? '',
  lookup_by_build_form: input?.lookup_by_build_form ?? false,
  title_suggestion: input?.title_suggestion ?? null,
  content_suggestion: input?.content_suggestion ?? null,
  default_category_id: input?.default_category_id ?? null,
  default_priority: input?.default_priority ?? null,
  inputs_attributes: (input?.inputs_attributes ?? []).map((item: any) => ({
    id: item?.id ?? undefined,
    order_index: item?.order_index ?? null,
    label: item?.label ?? null,
    _destroy: item?._destroy,
  })),
}))
export type IssueTemplateBodyType = any

export const IssueMigrationResponseSchema = z.object({}).passthrough()
export type IssueMigrationResponseType = z.output<typeof IssueMigrationResponseSchema>

export const IssueMigrationBodySchema = z.object({
  source_issue_id: NullableIntegerInputSchema.optional(),
  target_project_id: NullableIntegerInputSchema.optional(),
  target_category_id: NullableIntegerInputSchema.optional(),
}).passthrough()
export type IssueMigrationBodyType = z.output<typeof IssueMigrationBodySchema>

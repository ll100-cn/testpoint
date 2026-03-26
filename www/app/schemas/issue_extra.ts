import { z } from 'zod'

import { NullableBooleanInputSchema, NullableInputStringSchema, NullableIntegerInputSchema } from './_shared'
import {
  AttachmentSchema,
  IssueActivitySchema,
  IssueRelationshipSchema,
  IssueSchema,
  IssueSurveySchema,
  IssueTemplateSchema,
  SubscriptionSchema,
} from './issue'

export const IssueActionBoxSchema = z.object({
  issue: IssueSchema,
  activities: z.array(IssueActivitySchema),
})
export type IssueActionBoxType = z.output<typeof IssueActionBoxSchema>

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

export const IssueBodyBoxSchema = z.object({
  issue: IssueSchema,
  attachments: z.array(AttachmentSchema),
})
export type IssueBodyBoxType = z.output<typeof IssueBodyBoxSchema>

export const IssueBodyBodySchema = z.object({
  content: NullableInputStringSchema.optional(),
  attachments_params: z.array(z.unknown()).optional(),
}).passthrough()
export type IssueBodyBodyType = z.output<typeof IssueBodyBodySchema>

export const AttachmentBodySchema = z.object({
  title: NullableInputStringSchema.optional(),
}).passthrough()
export type AttachmentBodyType = z.output<typeof AttachmentBodySchema>

export const IssueRelationshipBoxSchema = z.object({
  issue_relationship: IssueRelationshipSchema,
}).transform((value) => ({
  issue_relationship: value.issue_relationship,
  issueRelationship: value.issue_relationship,
}))
export type IssueRelationshipBoxType = z.output<typeof IssueRelationshipBoxSchema>

export const IssueRelationshipBodySchema = z.object({
  target_id: NullableIntegerInputSchema.optional(),
  creator_subscribe_target_issue: NullableBooleanInputSchema.optional(),
}).passthrough()
export type IssueRelationshipBodyType = z.output<typeof IssueRelationshipBodySchema>

export const IssueSurveyBoxSchema = z.object({
  issue_survey: IssueSurveySchema,
}).transform((value) => ({
  issue_survey: value.issue_survey,
  issueSurvey: value.issue_survey,
}))
export type IssueSurveyBoxType = z.output<typeof IssueSurveyBoxSchema>

export const IssueSurveyListSchema = z.object({
  list: z.array(IssueSurveyBoxSchema),
}).transform(({ list }) => list)
export type IssueSurveyListType = z.output<typeof IssueSurveyListSchema>

export const IssueSurveyBodySchema = z.any().transform((input: any) => ({
  template_id: input?.template_id ?? input?.templateId ?? null,
  remark: input?.remark ?? null,
  inputs_attributes: (input?.inputs_attributes ?? []).map((item: any) => ({
    template_input_id: item?.template_input_id ?? item?.templateInputId ?? null,
    value: item?.value ?? null,
  })),
}))
export type IssueSurveyBodyType = z.output<typeof IssueSurveyBodySchema>

export const SubscriptionBoxSchema = z.object({
  subscription: SubscriptionSchema,
})
export type SubscriptionBoxType = z.output<typeof SubscriptionBoxSchema>

export const IssueTemplateBoxSchema = z.object({
  issue_template: IssueTemplateSchema,
}).transform((value) => ({
  issue_template: value.issue_template,
  issueTemplate: value.issue_template,
}))
export type IssueTemplateBoxType = z.output<typeof IssueTemplateBoxSchema>

export const IssueTemplateListSchema = z.object({
  list: z.array(IssueTemplateBoxSchema),
}).transform(({ list }) => list)
export type IssueTemplateListType = z.output<typeof IssueTemplateListSchema>

export const IssueTemplateBodySchema = z.any().transform((input: any) => ({
  name: input?.name ?? '',
  lookup_by_build_form: input?.lookup_by_build_form ?? input?.lookupByBuildForm ?? false,
  title_suggestion: input?.title_suggestion ?? input?.titleSuggestion ?? null,
  content_suggestion: input?.content_suggestion ?? input?.contentSuggestion ?? null,
  default_category_id: input?.default_category_id ?? input?.defaultCategoryId ?? null,
  default_priority: input?.default_priority ?? input?.defaultPriority ?? null,
  inputs_attributes: (input?.inputs_attributes ?? input?.inputs ?? []).map((item: any) => ({
    id: item?.id ?? undefined,
    order_index: item?.order_index ?? item?.orderIndex ?? null,
    label: item?.label ?? null,
    _destroy: item?._destroy,
  })),
}))
export type IssueTemplateBodyType = z.output<typeof IssueTemplateBodySchema>

export const IssueMigrationResponseSchema = z.object({}).passthrough()
export type IssueMigrationResponseType = z.output<typeof IssueMigrationResponseSchema>

export const IssueMigrationBodySchema = z.object({
  source_issue_id: NullableIntegerInputSchema.optional(),
  target_project_id: NullableIntegerInputSchema.optional(),
  target_category_id: NullableIntegerInputSchema.optional(),
}).passthrough()
export type IssueMigrationBodyType = z.output<typeof IssueMigrationBodySchema>

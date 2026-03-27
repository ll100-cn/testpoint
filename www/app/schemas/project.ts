import { z } from 'zod'

import { buildPageSchema, NullableInputStringSchema } from './_shared'

export const ProjectSchema = z.object({
  id: z.number().int(),
  name: z.string().optional(),
  archived: z.boolean().optional(),
  trello_list_id: z.string().nullable().optional(),
  trello_api_key: z.string().nullable().optional(),
  trello_api_token: z.string().nullable().optional(),
  webhook_url: z.string().nullable().optional(),
})
export type ProjectType = z.output<typeof ProjectSchema>

export const ProjectBoxSchema = z.object({
  project: ProjectSchema,
})
export type ProjectBoxType = z.output<typeof ProjectBoxSchema>

export const ProjectPageSchema = buildPageSchema(ProjectBoxSchema)
export type ProjectPageType = z.output<typeof ProjectPageSchema>

export const ProjectBodySchema = z.object({
  name: NullableInputStringSchema,
  webhook_url: NullableInputStringSchema,
})
export type ProjectBodyType = z.output<typeof ProjectBodySchema>

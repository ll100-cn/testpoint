import { z } from 'zod'

import { buildListParser, NullableInputStringSchema, NullableIntegerInputSchema, NullableIntegerSchema, NullableStringSchema } from './_shared'

export type PlatformType = {
  id: number
  name: string
  default_assignee_id?: number | null
  icon_svg?: string | null
}
export type PlatformBoxType = { platform: PlatformType }
export type PlatformListType = PlatformBoxType[]

export const PlatformSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  default_assignee_id: NullableIntegerSchema,
  icon_svg: NullableStringSchema,
}) as z.ZodType<PlatformType>

export const PlatformBoxSchema = z.object({
  platform: PlatformSchema,
}) as z.ZodType<PlatformBoxType>

export const PlatformListSchema = buildListParser(PlatformBoxSchema) as { parse(input: unknown): PlatformListType }

export const PlatformBodySchema = z.object({
  name: NullableInputStringSchema.optional(),
  icon_svg: NullableInputStringSchema.optional(),
  default_assignee_id: NullableIntegerInputSchema.optional(),
}).passthrough()
export type PlatformBodyType = z.output<typeof PlatformBodySchema>

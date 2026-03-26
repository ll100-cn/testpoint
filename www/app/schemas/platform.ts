import { z } from 'zod'

import { NullableInputStringSchema, NullableIntegerInputSchema, NullableIntegerSchema, NullableStringSchema } from './_shared'

export type PlatformType = {
  id: number
  name: string
  defaultAssigneeId: number | null
  default_assignee_id: number | null
  iconSvg: string | null
  icon_svg: string | null
}
export type PlatformBoxType = { platform: PlatformType }
export type PlatformListType = PlatformBoxType[]

export const PlatformSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  default_assignee_id: NullableIntegerSchema,
  icon_svg: NullableStringSchema,
}).transform((value) => ({
  id: value.id,
  name: value.name,
  defaultAssigneeId: value.default_assignee_id ?? null,
  default_assignee_id: value.default_assignee_id ?? null,
  iconSvg: value.icon_svg ?? null,
  icon_svg: value.icon_svg ?? null,
}) as PlatformType)

export const PlatformBoxSchema = z.object({
  platform: PlatformSchema,
}) as z.ZodType<PlatformBoxType>

export const PlatformListSchema = z.object({
  list: z.array(PlatformBoxSchema),
}).transform(({ list }) => list) as z.ZodType<PlatformListType>

export const PlatformBodySchema = z.object({
  name: NullableInputStringSchema.optional(),
  icon_svg: NullableInputStringSchema.optional(),
  default_assignee_id: NullableIntegerInputSchema.optional(),
}).passthrough()
export type PlatformBodyType = z.output<typeof PlatformBodySchema>

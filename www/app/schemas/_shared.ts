import { z } from 'zod'

export const IntegerSchema = z.number().int()
export const DateTimeSchema = z.coerce.date()

export const NullableStringSchema = z.string().nullable().optional().transform((value) => value ?? null)
export const NullableIntegerSchema = IntegerSchema.nullable().optional().transform((value) => value ?? null)
export const BooleanOrNullSchema = z.boolean().nullable().optional().transform((value) => value ?? null)

export const IntegerInputSchema = z.preprocess((value) => {
  if (typeof value === 'string') {
    return Number(value)
  }

  return value
}, IntegerSchema)

export const NullableIntegerInputSchema = z.preprocess((value) => {
  if (value === '' || value === undefined || value === null) {
    return null
  }

  if (typeof value === 'string') {
    return Number(value)
  }

  return value
}, IntegerSchema.nullable())

export const NullableInputStringSchema = z.preprocess((value) => {
  if (value === undefined) {
    return null
  }

  return value
}, z.string().nullable())

export const NullableBooleanInputSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === '') {
    return null
  }

  if (typeof value === 'string') {
    return !['false', '0', 'no'].includes(value.toLowerCase())
  }

  return value
}, z.boolean().nullable())

export function buildPageSchema<Item extends z.ZodTypeAny>(itemSchema: Item) {
  return z.object({
    total_count: IntegerSchema,
    offset: IntegerSchema,
    limit: IntegerSchema,
    list: z.array(itemSchema),
  }).transform(({ total_count, offset, limit, list }) => ({
    list,
    offset,
    limit,
    totalCount: total_count,
    current_page: Math.floor(offset / limit) + 1,
    total_pages: total_count === 0 ? 1 : Math.ceil(total_count / limit),
  }))
}

export function buildListSchema<Item extends z.ZodTypeAny>(itemSchema: Item) {
  return z.object({
    list: z.array(itemSchema),
  })
}

export function pathArraySchema() {
  return z.union([
    z.array(z.string()),
    z.string(),
    z.null(),
    z.undefined(),
  ]).transform((value) => {
    if (value == null) {
      return []
    }

    return Array.isArray(value) ? value : [value]
  })
}

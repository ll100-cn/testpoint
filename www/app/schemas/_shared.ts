import { z } from 'zod'

export const IntegerSchema = z.number().int()
export const DateTimeSchema = z.coerce.date()

export type Parser<T> = { parse(input: unknown): T }

export function createParser<Input, Output>(schema: z.ZodType<Input>, map: (value: Input) => Output): Parser<Output> {
  return {
    parse(input: unknown) {
      return map(schema.parse(input))
    },
  }
}

export function buildListParser<Item>(itemSchema: z.ZodType<Item>): Parser<Item[]> {
  return createParser(z.object({ list: z.array(itemSchema) }), ({ list }) => list)
}

export const NullableStringSchema = z.preprocess((value) => value ?? null, z.string().nullable())
export const NullableIntegerSchema = z.preprocess((value) => value ?? null, IntegerSchema.nullable())
export const BooleanOrNullSchema = z.preprocess((value) => value ?? null, z.boolean().nullable())

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
  })
}

export function buildListSchema<Item extends z.ZodTypeAny>(itemSchema: Item) {
  return z.object({
    list: z.array(itemSchema),
  })
}

export function pathArraySchema() {
  return z.preprocess((value) => {
    if (value == null) {
      return []
    }

    return Array.isArray(value) ? value : [value]
  }, z.array(z.string()))
}

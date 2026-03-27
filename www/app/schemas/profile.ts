import { z } from 'zod'

import { createParser, NullableInputStringSchema, NullableStringSchema } from './_shared'

type ProfileMethods = {
  findKlass(resource: any): string[]
  allow(action: string, resource: any): boolean
}

function withProfileMethods<T extends { permissions: Record<string, string[]> }>(profile: T) {
  return {
    ...profile,
    findKlass(resource: any): string[] {
      if (typeof resource === 'string') {
        return [resource]
      }

      if (typeof resource === 'object') {
        return this.findKlass(resource.constructor)
      }

      if (resource.__proto__ != null && resource.__proto__.name) {
        return [resource.name, ...this.findKlass(resource.__proto__)]
      }

      return [resource.name]
    },
    allow(action: string, resource: any) {
      const klasses = this.findKlass(resource)

      for (const klass of klasses) {
        const permission = profile.permissions[klass]

        if (permission == null) {
          continue
        }

        if (permission.includes('manage') || permission.includes(action)) {
          return true
        }
      }

      return false
    },
  }
}

export const ProfileSchema = z.object({
  member_id: z.number().int(),
  project_id: z.number().int(),
  role: z.string(),
  role_text: z.string(),
  nickname: NullableStringSchema,
  project_name: z.string(),
  permissions: z.record(z.string(), z.array(z.string())),
})

export type ProfileType = z.output<typeof ProfileSchema> & ProfileMethods

export function parseProfile(value: z.output<typeof ProfileSchema>): ProfileType {
  return withProfileMethods({
    member_id: value.member_id,
    project_id: value.project_id,
    role: value.role,
    role_text: value.role_text,
    nickname: value.nickname ?? null,
    project_name: value.project_name,
    permissions: value.permissions,
  })
}

const ProfileBoxRawSchema = z.object({
  profile: ProfileSchema,
})
export type ProfileBoxType = { profile: ProfileType }

export const ProfileBoxSchema = createParser(ProfileBoxRawSchema, ({ profile }) => ({ profile: parseProfile(profile) }))

export const ProfileBodySchema = z.object({
  nickname: NullableInputStringSchema.optional(),
}).passthrough()
export type ProfileBodyType = z.output<typeof ProfileBodySchema>

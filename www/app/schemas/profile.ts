import { z } from 'zod'

import { NullableInputStringSchema, NullableStringSchema } from './_shared'

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
}).transform((value) => withProfileMethods({
  memberId: value.member_id,
  projectId: value.project_id,
  role: value.role,
  roleText: value.role_text,
  nickname: value.nickname ?? null,
  projectName: value.project_name,
  permissions: value.permissions,
}))
export type ProfileType = z.output<typeof ProfileSchema>

export const ProfileBoxSchema = z.object({
  profile: ProfileSchema,
})
export type ProfileBoxType = z.output<typeof ProfileBoxSchema>

export const ProfileBodySchema = z.object({
  nickname: NullableInputStringSchema.optional(),
}).passthrough()
export type ProfileBodyType = z.output<typeof ProfileBodySchema>

import * as t from '@/lib/transforms'
import type { OmitByValue } from "utility-types"
import type { ProfileSchema } from './schema/profile'

export class Profile implements ProfileSchema {
  memberId!: number
  role!: string
  roleText!: string
  nickname: string | null = null
  projectId!: number
  projectName!: string

  @t.Raw permissions!: Record<string, string[]>

  constructor() {
    this.allow = this.allow.bind(this)
  }

  findKlass(resource: any): string[] {
    if (typeof resource == 'string') {
      return [ resource ]
    } else if (typeof resource == 'object') {
      return this.findKlass(resource.constructor)
    } else {
      if (resource.__proto__ != null && resource.__proto__.name) {
        return [ resource.name, ...this.findKlass(resource.__proto__) ]
      } else {
        return [ resource.name ]
      }
    }
  }

  allow(action: string, resource: any) {
    const klasses = this.findKlass(resource)

    for (const klass of klasses) {
      const permission = this.permissions[klass]

      if (permission == null) {
        continue
      }

      if (permission.includes('manage') || permission.includes(action)) {
        return true
      }
    }

    return false
  }
}

export class ProfileBoxImpl {
  @t.Klass(Profile) profile!: Profile
}

export type ProfileBox = OmitByValue<ProfileBoxImpl, Function>
import * as t from '@/lib/transforms'
import { md5 } from "js-md5"
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"
import type { UserSchema } from './schema/user'

export class User implements UserSchema {
  id!: number
  email!: string
  name!: string

  avatarUrl() {
    const hash = md5(this.email.trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${hash}`
  }
}

export class UserBoxImpl {
  @t.Klass(User) user!: User
}

export type UserBox = OmitByValue<UserBoxImpl, Function>

export class UserPage<Box extends UserBox> extends Pagination<Box> {
  @t.Klass(UserBoxImpl) list: Box[] = []
}
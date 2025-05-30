import * as t from '@/lib/transforms'
import md5 from "js-md5"
import { Pagination } from "./Pagination"

export class User {
  id!: number
  email!: string
  name!: string

  avatarUrl() {
    const hash = md5(this.email.trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${hash}`
  }
}

export class UserBox {
  @t.Klass(User) user!: User
}

export class UserPage<Box extends UserBox> extends Pagination<Box> {
  @t.Klass(UserBox) list: Box[] = []
}
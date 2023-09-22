import * as t from '@/lib/transforms'
import { User } from "./User"
import md5 from 'js-md5'

export class Account {
  @t.Klass(User) user: User

  @t.String name: string
  @t.String email: string

  avatarUrl() {
    const hash = md5(this.email.trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${hash}`
  }
}

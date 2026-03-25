import type { UserSchema } from './user'

export interface AccountSchema {
  user: UserSchema
  name: string
  email: string
  admin: boolean
}

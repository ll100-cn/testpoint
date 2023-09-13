import { Type } from "class-transformer"
import { User } from "./User"

export class Account {
  @Type(() => User)
  user: User
}

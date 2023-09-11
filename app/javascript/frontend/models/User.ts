import { Type } from "class-transformer"
import { Member } from "./Member"
import { Category } from "./Category"
import { Milestone } from "./Milestone"

export class User {
  id: number
  email: string
  name: string
}

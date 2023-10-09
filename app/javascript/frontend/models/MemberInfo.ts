import { Project } from "./Project"
import { Member } from "./Member"
import * as t from '@/lib/transforms'
import { User } from "./User"

export class MemberInfo extends Member {
  @t.Klass(User) user: User
  @t.Klass(Project) project: Project
}

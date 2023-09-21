import { Project } from "./Project"
import { Member } from "./Member"
import * as t from '@/lib/transforms'

export class MemberInfo extends Member {
  @t.Klass(Project) project: Project
}

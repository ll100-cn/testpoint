import * as t from '@/lib/transforms'
import { Project } from './Project'
import { User } from './User'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"
import type { MemberSchema } from './schema/member'

export enum Role {
  reporter,
  developer,
  manager,
  owner,
}

export class Member implements MemberSchema {
  id!: number
  name!: string
  nickname?: string
  role!: keyof typeof Role
  roleText!: string
  receiveMail!: boolean
  userId!: number
  projectId!: number
  avatarUrl?: string

  @t.Date archivedAt?: Date
}

export class MemberBoxImpl {
  @t.Klass(Member) member!: Member

  @t.Klass(Project) project?: Project
  @t.Klass(User) user?: User
}

export type MemberBox = OmitByValue<MemberBoxImpl, Function>

export class MemberPage<Box extends MemberBox> extends Pagination<Box> {
  @t.Klass(MemberBoxImpl) list: Box[] = []
}

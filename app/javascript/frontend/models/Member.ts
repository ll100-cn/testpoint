import * as t from '@/lib/transforms'
import { Project } from './Project'
import { User } from './User'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"

export enum Role {
  reporter,
  developer,
  manager,
  owner,
}

export class Member {
  id!: number
  name!: string
  nickname?: string
  role!: keyof typeof Role
  role_text!: string
  receive_mail!: boolean
  user_id!: number
  project_id!: number
  avatar_url?: string

  @t.Date archived_at?: Date
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

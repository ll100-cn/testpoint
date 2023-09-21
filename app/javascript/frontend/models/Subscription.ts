import * as t from '@/lib/transforms'
import { Member } from './Member'

export class Subscription {
  @t.Number id: number
  @t.Number user_id: number

  @t.Date updated_at: Date
  @t.Klass(Member) member: Member
}

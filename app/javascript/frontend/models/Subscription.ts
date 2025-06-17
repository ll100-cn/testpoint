import * as t from '@/lib/transforms'
import { Member } from './Member'
import type { OmitByValue } from "utility-types"

export class Subscription {
  @t.Number id!: number
  @t.Number user_id!: number

  @t.Date updated_at!: Date
  @t.Klass(Member) member!: Member
}

export class SubscriptionBoxImpl {
  @t.Klass(Subscription) subscription!: Subscription
}

export type SubscriptionBox = OmitByValue<SubscriptionBoxImpl, Function>

import * as t from '@/lib/transforms'
import { Member } from './Member'
import type { OmitByValue } from "utility-types"
import type { SubscriptionSchema } from './schema/subscription'

export class Subscription implements SubscriptionSchema {
  @t.Number id!: number
  @t.Number user_id!: number
  @t.Number issue_id!: number

  @t.Date updated_at!: Date
  @t.Klass(Member) member!: Member
}

export class SubscriptionBoxImpl {
  @t.Klass(Subscription) subscription!: Subscription
}

export type SubscriptionBox = OmitByValue<SubscriptionBoxImpl, Function>

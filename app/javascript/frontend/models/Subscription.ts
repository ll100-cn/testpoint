import * as t from '@/lib/transforms'
import { Member } from './Member'
import type { OmitByValue } from "utility-types"
import type { SubscriptionSchema } from './schema/subscription'

export class Subscription implements SubscriptionSchema {
  @t.Number id!: number
  @t.Number userId!: number
  @t.Number issueId!: number

  @t.Date updatedAt!: Date
  @t.Klass(Member) member!: Member
}

export class SubscriptionBoxImpl {
  @t.Klass(Subscription) subscription!: Subscription
}

export type SubscriptionBox = OmitByValue<SubscriptionBoxImpl, Function>

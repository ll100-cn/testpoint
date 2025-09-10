import * as t from "@/lib/transforms"
import type { OmitByValue } from "utility-types"
import type { PhaseSchema } from './schema/phase'

export class Phase implements PhaseSchema {
  id!: number
  title!: string
}

export class PhaseBoxImpl {
  @t.Klass(Phase) phase!: Phase
  upshotsStateCounts: { [key in "pass" | "failure" | "pending"]: number } | null = null
}

export type PhaseBox = OmitByValue<PhaseBoxImpl, Function>

export class PhaseInfo extends PhaseBoxImpl {
  declare upshotsStateCounts: { [key in "pass" | "failure" | "pending"]: number }
}
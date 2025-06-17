import * as t from "@/lib/transforms"
import type { OmitByValue } from "utility-types"

export class Phase {
  id!: number
  title!: string
}

export class PhaseBoxImpl {
  @t.Klass(Phase) phase!: Phase
  upshots_state_counts: { [key in "pass" | "failure" | "pending"]: number } | null = null
}

export type PhaseBox = OmitByValue<PhaseBoxImpl, Function>

export class PhaseInfo extends PhaseBoxImpl {
  declare upshots_state_counts: { [key in "pass" | "failure" | "pending"]: number }
}
import * as t from "@/lib/transforms"

export class Phase {
  id!: number
  title!: string
}

export class PhaseBox {
  @t.Klass(Phase) phase!: Phase
  upshots_state_counts: { [key in "pass" | "failure" | "pending"]: number } | null = null
}

export class PhaseInfo extends PhaseBox {
  declare upshots_state_counts: { [key in "pass" | "failure" | "pending"]: number }
}
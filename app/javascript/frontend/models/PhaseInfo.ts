import { Phase } from "./Phase";

export class PhaseInfo extends Phase {
  upshots_state_counts!: { [key in "pass" | "failure" | "pending"]: number }
}

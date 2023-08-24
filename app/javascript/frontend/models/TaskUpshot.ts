type TaskUpshotInfoState = "" | "pending" | "pass" | "failure"
type TaskUpshotInfoStateOverride = "" | "pass" | "failure"

export class TaskUpshot {
  id: number
  state: TaskUpshotInfoState
  state_override: TaskUpshotInfoStateOverride
  phase_id: number
  state_changed_at: Date
  content: string
}

import * as t from '@/lib/transforms'

type TaskUpshotInfoState = "" | "pending" | "pass" | "failure"
type TaskUpshotInfoStateOverride = "" | "pending" | "pass" | "failure"

export class TaskUpshot {
  id!: number
  state!: TaskUpshotInfoState
  state_override: TaskUpshotInfoStateOverride | null = null
  phase_id!: number
  @t.Date state_changed_at: Date | null = null
  content: string | null = null

  @t.Date created_at!: Date
}
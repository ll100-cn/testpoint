import * as t from '@/lib/transforms'
import type { TaskUpshotSchema } from './schema/task_upshot'

type TaskUpshotInfoState = "" | "pending" | "pass" | "failure"
type TaskUpshotInfoStateOverride = "" | "pending" | "pass" | "failure"

export class TaskUpshot implements TaskUpshotSchema {
  id!: number
  state!: TaskUpshotInfoState
  stateOverride: TaskUpshotInfoStateOverride | null = null
  phaseId!: number
  @t.Date stateChangedAt: Date | null = null
  content: string | null = null

  @t.Date createdAt!: Date
}
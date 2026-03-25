import * as t from "@/lib/transforms"
import type { TaskSchema } from './schema/task'

export class Task implements TaskSchema {
  id!: number
  planId!: number
  state!: string
  finished!: boolean
  phaseId!: number
  testCaseId: number | null = null

  @t.Date ignoreAt: Date | null = null

  is_ignored(): boolean {
    return this.ignoreAt != null
  }
}
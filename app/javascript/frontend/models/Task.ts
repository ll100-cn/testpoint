import * as t from "@/lib/transforms"

export class Task {
  id!: number
  plan_id!: number
  state!: string
  finished!: boolean
  phase_id!: number
  test_case_id: number | null = null

  @t.Date ignore_at: Date | null = null

  is_ignored(): boolean {
    return this.ignore_at != null
  }
}
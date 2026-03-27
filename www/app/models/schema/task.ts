export interface TaskSchema {
  id: number
  finished: boolean
  plan_id?: number | null
  ignore_at?: Date | null
  phase_id?: number | null
  test_case_id?: number | null
}

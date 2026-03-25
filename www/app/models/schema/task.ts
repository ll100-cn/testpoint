export interface TaskSchema {
  id: number
  finished: boolean
  planId?: number | null
  ignoreAt?: Date | null
  phaseId?: number | null
  testCaseId?: number | null
}

export interface TaskUpshotSchema {
  id: number
  state?: string
  content?: string | null
  stateOverride?: string | null
  stateChangedAt?: Date | null
  phaseId?: number | null
  createdAt?: Date
}

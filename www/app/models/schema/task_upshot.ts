export interface TaskUpshotSchema {
  id: number
  state?: string
  content?: string | null
  state_override?: string | null
  state_changed_at?: Date | null
  phase_id?: number | null
  created_at?: Date
}

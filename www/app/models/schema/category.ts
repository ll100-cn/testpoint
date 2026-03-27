export interface CategorySchema {
  id: number
  name: string
  description?: string | null
  color?: string | null
  project_id: number
  default_as_test_failure: boolean
}

export interface CategorySchema {
  id: number
  name: string
  description?: string | null
  color?: string | null
  projectId: number
  defaultAsTestFailure: boolean
}

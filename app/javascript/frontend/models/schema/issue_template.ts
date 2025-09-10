import type { CategorySchema } from './category'

export interface IssueTemplateSchema {
  id: number
  name: string
  inputs: unknown[]
  projectId: number
  lookupByBuildForm: boolean
  titleSuggestion?: string | null
  contentSuggestion?: string | null
  defaultCategoryId?: number | null
  defaultPriority: string
  defaultPriorityText: string
  defaultCategory?: CategorySchema
}

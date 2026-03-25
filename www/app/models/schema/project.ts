export interface ProjectSchema {
  id: number
  name?: string
  archived?: boolean
  trelloListId?: string | null
  trelloApiKey?: string | null
  trelloApiToken?: string | null
  webhookUrl?: string | null
}

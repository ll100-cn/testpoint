export interface ProjectSchema {
  id: number
  name?: string
  archived?: boolean
  trello_list_id?: string | null
  trello_api_key?: string | null
  trello_api_token?: string | null
  webhook_url?: string | null
}

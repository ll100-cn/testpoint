export class Project {
  id: number
  name: string
  archived: boolean

  trello_list_id?: string
  trello_api_key?: string
  trello_api_token?: string
  webhook_url?: string
}

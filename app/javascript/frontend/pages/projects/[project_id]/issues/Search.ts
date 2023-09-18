import { Type } from "class-transformer"

export default class Search {
  @Type() stage?: string = undefined
  @Type() keyword?: string = undefined
  @Type() category_id_eq?: string = ""
  @Type() milestone_id_eq?: string = ""
  @Type() assignee_id_eq?: string = ""
  @Type() creator_id_eq?: string = ""
  @Type() task_id_is?: string = ""
}

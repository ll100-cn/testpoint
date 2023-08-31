import { Type } from "class-transformer"

export default class Search {
  @Type() filter?: string = undefined
  @Type() keyword?: string = undefined
  @Type() category_id_eq?: string = undefined
  @Type() milestone_id_eq?: string = undefined
  @Type() assignee_id_eq?: string = undefined
  @Type() creator_id_eq?: string = undefined
  @Type() task_id_is?: string = undefined
}

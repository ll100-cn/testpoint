import * as t from '@/lib/transforms'

export class Search2 {
  @t.String stage?: string = 'pending'
  @t.String keyword?: string = undefined
}

export class Filter2 {
  @t.Number category_id_eq?: number = undefined
  @t.Number milestone_id_eq?: number = undefined
  @t.Number assignee_id_eq?: number = undefined
  @t.Number creator_id_eq?: number = undefined
  @t.String task_id_is?: string = undefined
}



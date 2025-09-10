import _ from "lodash"
import { type AxiosResponse } from "axios"

export class Pagination<T> {
  list!: T[]
  totalCount!: number
  offset!: number
  limit!: number

  get current_page() {
    return Math.floor(this.offset / this.limit) + 1
  }

  get total_pages() {
    return this.totalCount == 0 ? 1 : Math.ceil(this.totalCount / this.limit)
  }
}

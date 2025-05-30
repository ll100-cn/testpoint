import _ from "lodash"
import { type AxiosResponse } from "axios"

export class Pagination<T> {
  list!: T[]
  total_count!: number
  offset!: number
  limit!: number

  get current_page() {
    return Math.floor(this.offset / this.limit) + 1
  }

  get total_pages() {
    return this.total_count == 0 ? 1 : Math.ceil(this.total_count / this.limit)
  }
}
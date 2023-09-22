import _ from "lodash"
import { AxiosResponse } from "axios"

export class Pagination<T> {
  list: T[]
  total_count: number
  offset: number
  limit: number
  current_page: number
  total_pages: number

  build({ headers }: AxiosResponse) {
    this.offset = _.toInteger(headers['x-pagination-offset'])
    this.limit = _.toInteger(headers['x-pagination-limit'])
    this.total_count = _.toInteger(headers['x-pagination-total-count'])
    this.current_page = Math.floor(this.offset / this.limit) + 1
    this.total_pages = Math.ceil(this.total_count / this.limit)
  }
}

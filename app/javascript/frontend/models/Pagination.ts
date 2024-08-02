// import _ from "lodash"
// import { type AxiosResponse } from "axios"

// export class Pagination<T> {
//   list: T[]
//   total_count: number
//   offset: number
//   limit: number
//   current_page: number
//   total_pages: number

//   build({ headers }: AxiosResponse) {
//     this.offset = _.toInteger(headers['x-pagination-offset'])
//     this.limit = _.toInteger(headers['x-pagination-limit'])
//     this.total_count = _.toInteger(headers['x-pagination-total-count'])
//     this.current_page = Math.floor(this.offset / this.limit) + 1
//     this.total_pages = this.total_count == 0 ? 1 : Math.ceil(this.total_count / this.limit)
//   }
// }

import _ from "lodash"
import { type AxiosResponse } from "axios"

export class Pagination<T> {
  list!: T[]
  total_count!: number
  offset!: number
  limit!: number

  build({ headers }: AxiosResponse) {
    this.offset = _.toInteger(headers['x-pagination-offset'])
    this.limit = _.toInteger(headers['x-pagination-limit'])
    this.total_count = _.toInteger(headers['x-pagination-total-count'])
  }

  get current_page() {
    return Math.floor(this.offset / this.limit) + 1
  }

  get total_pages() {
    return this.total_count == 0 ? 1 : Math.ceil(this.total_count / this.limit)
  }
}

import { useRoute } from "vue-router"
import * as utils from "./utils"
import qs from "qs"

export default class OkUrl {
  route: ReturnType<typeof useRoute>

  constructor(route: ReturnType<typeof useRoute>) {
    this.route = route
  }

  withDefault(default_value: string): string {
    const query = utils.queryToPlain(this.route.query) as any
    return query.ok_url ?? default_value
  }

  apply(origin: string | { path: string, query?: any }) {
    const full_path = this.route.fullPath
    if (typeof origin == 'string') {
      return { path: origin, query: utils.plainToQuery({ ok_url: full_path }) }
    } else {
      const query = utils.queryToPlain(origin.query)
      query.ok_url ??= full_path
      return { ...origin, query: utils.plainToQuery(query) }
    }
  }

  href(origin: string | { path: string, query: any }) {
    const { path, query } = this.apply(origin)
    return path + qs.stringify(query, { addQueryPrefix: true })
  }
}

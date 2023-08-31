import { Type } from "class-transformer"

export default class Page {
  @Type() page?: number = undefined
  @Type() items?: number = undefined
}

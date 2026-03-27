import _ from "lodash"

export default class Validation {
  code: string
  state: "pending" | "invalid" | "valid"
  messages: string[]

  isInvaild() {
    return this.state == "invalid"
  }
}

import _ from "lodash"
import { plainToInstance } from 'class-transformer'
import { Validation } from "@/models"
import { AxiosError } from "axios"

export default class Validations {
  data: { [ key: string ]: Validation } = {}
  names: { [ key: string ]: string } = {}
  ignores: string[] = []

  get(code) {
    if (this.data[code]) {
      return this.data[code]
    }

    console.log(code)
    this.data[code] = plainToInstance(Validation, {
      code,
      state: null,
      messages: [],
    })

    return this.data[code]
  }

  clear() {
    this.data = {}
  }

  isAvaliableInvalid() {
    return _.some(this.data, (validation) => {
      return !this.ignores.includes(validation.code) && validation.isInvaild()
    })
  }

  ignore(code) {
    if (!this.ignores.includes(code)) {
      this.ignores.push(code)
    }
    return code
  }

  invalid(code: string, message: string) {
    const validation = this.get(code)
    if (validation.isInvaild()) {
      validation.messages.push(message)
    } else {
      validation.state = "invalid"
      validation.messages = [ message ]
    }
  }

  marge(validations: Validation[], names: { [x in string]: string }) {
    for (const validation of validations) {
      this.data[validation.code] = validation
    }

    Object.assign(this.names, names)
  }

  avaliableFullMessages() {
    return Object.values(this.data).flatMap((validation) => {
      if (this.ignores.includes(validation.code) || !validation.isInvaild()) {
        return []
      }

      const name = this.names[validation.code]
      return validation.messages.map((message) => (name ?? "") + message)
    })
  }

  fullMessages() {
    return Object.values(this.data).flatMap((validation) => {
      if (!validation.isInvaild()) {
        return []
      }

      const name = this.names[validation.code]
      return validation.messages.map((message) => name + message)
    })
  }

  handleError(err: any) {
    if (!(err instanceof AxiosError) || err.response.status != 422) {
      return false
    }
    const resp = err.response
    const errors = resp.data.errors
    Object.assign(this.names, resp.data.names)

    for (const code in errors || {}) {
      const messages = errors[code]
      const validation = this.get(code)
      validation.state = "invalid"
      validation.messages = messages
    }
    return true
  }

  disconnect(code: string) {
    this.ignore(code)
    return this.get(code)
  }
}

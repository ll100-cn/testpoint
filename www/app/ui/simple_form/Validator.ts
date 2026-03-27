import { type ErrorsObject } from "./ErrorsObject"
import { UnprocessableEntityError } from "./UnprocessableEntityError"
import Validation from "./Validation"

export default class Validator {
  validations = new Map<string, Validation>()
  names = new Map<string, string>()

  get(key: string) {
    if (!this.validations.has(key)) {
      const validation = new Validation()
      this.validations.set(key, validation)
    }

    return this.validations.get(key)!
  }

  clear() {
    for (const validation of this.validations.values()) {
      validation.clear()
    }
  }

  errorMessages(ignoreKeys: string[]) {
    const messages = [] as string[]
    for (const [key, validation] of this.validations.entries()) {
      if (!ignoreKeys.includes(key) && validation.state === 'invalid') {
        const name = this.names.get(key)
        messages.push(name ? `${name} ${validation.messages}` : `${validation.messages}`)
      }
    }
    return messages.sort((a, b) => a.length - b.length)
  }

  processErrorsObject(data: ErrorsObject) {
    for (const key in data.errors) {
      const messages = data.errors[key]
      this.get(key).invalid(messages)
    }

    for (const code in data.names) {
      this.names.set(code, data.names[code])
    }
  }

  processError(e: any) {
    if (this.handleError(e)) {
      return
    }

    throw e
  }

  handleError(e: any) {
    if (e instanceof UnprocessableEntityError) {
      this.processErrorsObject(e.errors)
      return true
    }

    return false
  }

  hasError() {
    for (const validation of this.validations.values()) {
      if (validation.state === 'invalid') {
      return true
    }
    }
    return false
  }
}

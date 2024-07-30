import { AxiosError } from "axios"
import Validation from "./Validation"
import { UnprocessableEntityError } from "./UnprocessableEntityError"
import type { ErrorsObject } from "./ErrorsObject"

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
        messages.push(...validation.messages)
      }
    }

    return messages
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
    if (e instanceof UnprocessableEntityError) {
      this.processErrorsObject(e.errors)
      return true
    }

    return false
  }
}

// function if_const<T>(value: T, callback: (value: NonNullable<T>) => void) {
//   if (value) {
//     callback(value)
//   }
// }

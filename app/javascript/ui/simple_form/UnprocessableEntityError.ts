import type { ErrorsObject } from "./ErrorsObject"

export class UnprocessableEntityError extends Error {
  errors!: ErrorsObject

  constructor(errors: ErrorsObject) {
    super('Unprocessable Entity Error')
    this.errors = errors
  }
}

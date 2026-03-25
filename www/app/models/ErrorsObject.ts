export class ErrorsObject {
  errors!: Record<string, string[]>
  error_messages!: string[]
  names!: Record<string, string>
  get errorMessages() {
    return this.error_messages
  }
}

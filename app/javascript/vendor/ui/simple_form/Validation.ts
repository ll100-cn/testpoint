export default class Validation {
  state: "pending" | 'invalid' | 'valid' = 'pending'
  messages: string[] = []

  clear() {
    this.state = 'pending'
    this.messages = []
  }

  invalid(messages: string[]) {
    this.state = 'invalid'
    this.messages = messages
  }
}

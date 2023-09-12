import md5 from "md5"

export class User {
  id: number
  email: string
  name: string

  avatarUrl() {
    const hash = md5(this.email.trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${hash}`
  }
}

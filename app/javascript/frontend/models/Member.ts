import md5 from "md5"

export class Member {
  id: number
  email: string
  name: string
  nickname: string | null
  role: string
  role_text: string
  receive_mail: boolean
  user_id: number
  project_id: number

  avatarUrl() {
    const hash = md5(this.email.trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${hash}`
  }
}

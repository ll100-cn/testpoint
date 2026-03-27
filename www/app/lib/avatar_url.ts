import { md5 } from 'js-md5'

export function avatarUrlByEmail(email?: string | null) {
  const normalized = email?.trim().toLowerCase()

  if (!normalized) {
    return 'https://www.gravatar.com/avatar'
  }

  return `https://www.gravatar.com/avatar/${md5(normalized)}`
}

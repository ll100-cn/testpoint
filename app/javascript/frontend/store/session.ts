import { Account, User } from '@/models'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    account: null as User,
    error: null as Object | Error
  })
})

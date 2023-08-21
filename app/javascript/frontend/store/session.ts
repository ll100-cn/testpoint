import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    account: null as number | string,
    error: null as Object | Error
  })
})

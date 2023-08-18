import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', {
  state: () => ({
    account: 1111 as number | string
  })
})

import { Account } from '@/models'
import * as q from '@/lib/requests'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const account = ref(undefined! as Account | null)

  async function prepare(ctx: any) {
    if (account.value !== undefined) {
      return
    }

    try {
      account.value = await new q.profile.BasicReq.Get().setup(ctx).perform()
    } catch (e) {
      if (e instanceof q.ErrorUnauthorized) {
        account.value = null
        return
      }
      throw e
    }
  }

  function clear() {
    account.value = null
  }

  return { account, prepare, clear }
})

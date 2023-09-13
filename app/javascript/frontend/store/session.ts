import { Account } from '@/models'
import * as requests from '@/requests'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const account = ref(undefined! as Account | null)
  const error = ref(null)

  async function prepare(ctx: any) {
    if (account.value !== undefined) {
      return
    }

    try {
      account.value = await new requests.AccountGet().setup(ctx).perform()
    } catch (e) {
      if (e instanceof requests.ErrorUnauthorized) {
        account.value = null
        return
      }
      throw e
    }
  }

  function clear() {
    account.value = null
  }

  return { account, error, prepare, clear }
})

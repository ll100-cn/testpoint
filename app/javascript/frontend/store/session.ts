import { Account, Profile } from '@/models'
import * as q from '@/requests'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import _ from 'lodash'
import createCacheRequest from '@/lib/createCacheRequest'

export const useSessionStore = defineStore('session', () => {
  const account = ref(undefined! as Account | null)
  const profiles = reactive(new Map<number, Profile>)

  async function prepare(ctx: any) {
    if (account.value !== undefined) {
      return
    }

    try {
      const account_box = await new q.profile.accounts.Get().setup(ctx, () => {}).perform1()
      account.value = account_box.account
    } catch (e) {
      if (e instanceof q.ErrorUnauthorized) {
        account.value = null
        return
      }
      throw e
    }
  }

  async function prepareProject(project_id: any, ctx: any) {
    if (account.value == null) {
      return
    }

    project_id = _.toNumber(project_id)

    if (profiles.has(project_id)) {
      return
    }

    const profile_box = await new q.project.profiles.Get(project_id).setup(ctx, req => {}).perform1()
    profiles.set(project_id, profile_box.profile)
  }

  function clear() {
    account.value = null
    cleanup()
  }

  const { request, cleanup } = createCacheRequest()

  return { account, profiles, prepare, clear, prepareProject, request }
})

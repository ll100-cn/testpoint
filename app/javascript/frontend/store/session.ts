import { Account, Profile } from '@/models'
import * as q from '@/lib/requests'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import _ from 'lodash'

export const useSessionStore = defineStore('session', () => {
  const account = ref(undefined! as Account | null)
  const profiles = reactive(new Map<number, Profile>)

  // /projects/project_id/profile

  async function prepare(ctx: any) {
    if (account.value !== undefined) {
      return
    }

    try {
      account.value = await new q.profile.AccountReq.Get().setup(ctx).perform()
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

    const profile = await new q.project.ProfileReq.Get().setup(ctx, req => {
      req.interpolations.project_id = project_id
    }).perform()
    profiles.set(project_id, profile)
  }

  function clear() {
    account.value = null
  }

  return { account, profiles, prepare, clear, prepareProject }
})

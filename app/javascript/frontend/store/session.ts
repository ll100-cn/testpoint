import { Account, Profile } from '@/models'
import * as q from '@/requests'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import _ from 'lodash'
import createCacheRequest from '@/lib/createCacheRequest'
import { useQueryLine } from '@/lib/useQueryLine'

export const useSessionStore = defineStore('session', () => {
  const account = ref(undefined! as Account | null)
  const profiles = reactive(new Map<number, Profile>)
  const line = useQueryLine()

  async function prepare(ctx: any) {
    if (account.value !== undefined) {
      return
    }

    try {
      const { data: account_box, suspense } = line.request(q.profile.accounts.Get, (req, it) => {
        return it.useQuery(req.toQueryConfig())
      })
      await suspense()

      account.value = account_box.value.account
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

    const { data: profile_box } = line.request(q.project.profiles.Get, (req, it) => {
      req.interpolations.project_id = project_id
      return it.useQuery(req.toQueryConfig())
    })
    await line.wait()

    profiles.set(project_id, profile_box.value.profile)
  }

  function clear() {
    account.value = null
    cleanup()
  }

  const { request, cleanup } = createCacheRequest()

  return { account, profiles, prepare, clear, prepareProject, request }
})

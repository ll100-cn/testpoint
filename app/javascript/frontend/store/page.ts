import { BaseRequest } from '@/requests'
import _ from 'lodash'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSessionStore } from '.'
import { Profile } from '@/models'
import createCacheRequest from '@/lib/createCacheRequest'

class ProjectCache {
  project_id!: number
  profile!: Profile
  caches = new Map<any, any>()

  constructor() {
    this.allow = this.allow.bind(this)
  }

  request<T extends BaseRequest<any>>(klass: new () => T): T {
    if (this.caches.has(klass)) {
      return this.caches.get(klass)
    } else {
      const request = new klass()
      request.interpolations.project_id = this.project_id
      this.caches.set(klass, request)
      return request
    }
  }

  allow(action: string, resource: any) {
    if (this.profile == null) {
      return false
    }

    return this.profile.allow(action, resource)
  }
}

export const usePageStore = defineStore('page', () => {
  const route = useRoute()
  const errors = ref([] as any[])
  const caches = new Map<any, any>()
  const meta = ref({ title: null as string | null })

  function cache<T>(key: any, callback: () => T): T {
    if (caches.has(key)) {
      return caches.get(key)
    } else {
      const instance = callback()
      caches.set(key, instance)
      return instance
    }
  }

  function singleton<T>(klass: new() => T) {
    return cache(klass, () => new klass())
  }

  function inProject(): ProjectCache | null {
    const params = route.params as any

    if (!params.project_id) {
      return null
    }

    const project_id = _.toNumber(params.project_id)
    const key = `project-${project_id}`
    return cache(key, () => {
      const result = new ProjectCache()
      const session = useSessionStore()
      const profile = session.profiles.get(project_id)
      result.project_id = project_id
      result.profile = profile
      return result
    })
  }

  function clear() {
    errors.value = []
    caches.clear()
  }

  return { errors, inProject, singleton, clear, meta }
})

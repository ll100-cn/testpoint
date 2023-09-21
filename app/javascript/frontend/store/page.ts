import { BaseRequest } from '@/lib/requests'
import _ from 'lodash'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

class ProjectCache {
  project_id: number
  caches = new Map<any, any>()

  request<T extends BaseRequest<any>>(klass: new () => T) {
    if (this.caches.has(klass)) {
      return this.caches.get(klass)
    } else {
      const request = new klass()
      request.interpolations.project_id = this.project_id
      this.caches.set(klass, request)
      return request
    }
  }
}

export const usePageStore = defineStore('page', () => {
  const errors = ref([] as any[])

  const caches = new Map<any, any>()

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
    const route = useRoute()
    const params = route.params as any

    if (!params.project_id) {
      return null
    }

    const key = `project-${params.project_id}`
    return cache(key, () => {
      const result = new ProjectCache()
      result.project_id = _.toNumber(params.project_id)
      return result
    })
  }

  function clear() {
    errors.value = []
    caches.clear()
  }

  return { errors, inProject, singleton, clear }
})

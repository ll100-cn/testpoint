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

  function global<T>(key: any, callback: () => T) {
    if (caches.has(key)) {
      return caches.get(key)
    } else {
      const instance = callback()
      caches.set(key, instance)
      return instance
    }
  }

  function inProject(): ProjectCache {
    const route = useRoute()
    const params = route.params as any

    if (!params.project_id) {
      throw `no project_id in path ${route.path}`
    }

    const key = `project-${params.project_id}`
    return global(key, () => {
      const result = new ProjectCache()
      result.project_id = _.toNumber(params.project_id)
      return result
    })
  }

  function clear() {
    errors.value = []
    caches.clear()
  }

  return { errors, inProject, global, clear }
})

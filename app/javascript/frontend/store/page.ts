import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('page', () => {
  const errors = ref([] as any[])

  function clear() {
    errors.value = []
  }

  return { errors, clear }
})

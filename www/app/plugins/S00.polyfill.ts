import 'reflect-metadata'
import buffer from 'buffer'

export default defineNuxtPlugin(() => {
  if (typeof globalThis.Buffer === 'undefined') {
    globalThis.Buffer = buffer.Buffer
  }
})

import Keyv from '@keyvhq/core'
import { App } from 'vue'

const keyv = new Keyv()

export default function(app: App) {
  app.config.globalProperties.$keyv = keyv
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keyv: Keyv
  }
}

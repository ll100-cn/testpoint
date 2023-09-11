import { AppContext } from '@/types'
import Keyv from '@keyvhq/core'

const keyv = new Keyv()

export default function({ app }: AppContext) {
  app.config.globalProperties.$keyv = keyv
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keyv: Keyv
  }
}

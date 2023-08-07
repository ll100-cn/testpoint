import { AppContext } from '@/types'
import Keyv from '@keyvhq/core'

const keyv = new Keyv()

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $keyv: Keyv
  }
}

export default function({ app }: AppContext) {
  app.config.globalProperties.$keyv = keyv
}

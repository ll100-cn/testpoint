import { AppContext } from "@/types";

import Axios from 'axios'

const axios = Axios.create({
})

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: typeof axios
  }
}

export default function({ app }: AppContext) {
  app.config.globalProperties.$axios = axios
}

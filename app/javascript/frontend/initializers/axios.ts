import { AppContext } from "@/types";

import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.RAILS_RELATIVE_URL_ROOT
})

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: typeof axios
  }
}

export default function({ app }: AppContext) {
  app.config.globalProperties.$axios = axios
}

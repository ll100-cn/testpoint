import { AppContext } from "@/types";

import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_RUBY_BASE ?? "/"
})

export default function({ app }: AppContext) {
  app.config.globalProperties.$axios = axios
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios
  }
}

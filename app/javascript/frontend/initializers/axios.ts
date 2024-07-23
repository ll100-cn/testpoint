import { AppContext } from "@/types";

import Axios from 'axios'
import { App } from "vue"

const axios = Axios.create({
  baseURL: import.meta.env.VITE_RUBY_BASE ?? "/"
})

export default function(app: App) {
  app.config.globalProperties.$axios = axios
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios
  }
}

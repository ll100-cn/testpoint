import { AppContext } from "@/types";

import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_RAILS_RELATIVE_URL_ROOT ?? "/"
})

export default function({ app }: AppContext) {
  app.config.globalProperties.$axios = axios
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios
  }
}

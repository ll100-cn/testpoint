import { AppContext } from "@/types";
import { createPinia } from "pinia"

export default function({ app }: AppContext) {
  app.use(createPinia())
}

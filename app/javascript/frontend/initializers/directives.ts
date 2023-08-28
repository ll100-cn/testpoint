import directives from "@/directives"
import { AppContext } from "@/types"

export default function({ app }: AppContext) {
  directives(app)
}

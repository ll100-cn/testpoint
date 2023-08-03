import { AppContext } from "@/types";
import { Tooltip } from 'bootstrap'

export default function({ app }: AppContext) {
  app.directive('bs-tooltip', function(el, binding) {
    new Tooltip(el, {
      title: binding.value,
      placement: binding.arg,
      trigger: 'hover'
    })
  })
}

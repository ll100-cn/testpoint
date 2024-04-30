import { Tooltip } from 'bootstrap'
import { type DirectiveBinding, type ObjectDirective } from 'vue'

export default <ObjectDirective>{
  created(el: HTMLElement, binding: DirectiveBinding) {
    new Tooltip(el, {
      title: binding.value,
      placement: binding.arg as any,
      trigger: 'hover'
    })
  },

  unmounted(el, binding) {
    const tooltip = Tooltip.getInstance(el)
    tooltip?.dispose()
  },
}


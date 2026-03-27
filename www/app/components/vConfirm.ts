import { type DirectiveBinding, type ObjectDirective } from 'vue'

export default <ObjectDirective>{
  created(el: HTMLElement, binding: DirectiveBinding) {
    (el as any)['confirmHandler'] = function(event: Event) {
      const message = binding.value ?? "确认操作?"
      const answer = confirm(message)

      if (answer === false) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }

    el.addEventListener('click', (el as any)['confirmHandler'])
  },

  unmounted(el, binding) {
    el.removeEventListener('click', (el as any)['confirmHandler'])
  },
}

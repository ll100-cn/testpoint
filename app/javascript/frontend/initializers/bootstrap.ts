import { AppContext } from "@/types"
import { Modal, Tooltip } from 'bootstrap'
import _ from "lodash"

export default function({ app }: AppContext) {
  app.directive('bs-tooltip', function(el, binding) {
    new Tooltip(el, {
      title: binding.value,
      placement: binding.arg as any,
      trigger: 'hover'
    })
  })

  const router = app.config.globalProperties.$router
  router.beforeEach((to, from, next) => {
    const elements = document.querySelectorAll('.modal.show')
    const modals = _(elements).map(it => Modal.getInstance(it)).compact().value()

    if (modals.length > 0) {
      document.addEventListener('hidden.bs.modal', () => next(), { once: true })

      for (const modal of modals) {
        modal.hide()
      }
    } else {
      next()
    }
  })
}

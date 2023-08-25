import { Tooltip } from 'bootstrap'

export default (el, binding) => {
  const tooltip = new Tooltip(el, {
    title: binding.value,
    placement: binding.arg,
    trigger: 'hover'
  })
}

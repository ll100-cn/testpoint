import { defineComponent, h } from "vue"

import Form from "./Form.vue"
import FormGroup from "./FormGroup.vue"
import type { ComponentEmit, ComponentExposed, ComponentProps, ComponentType, ComponentSlots } from 'vue-component-type-helpers'

export default function <T extends object>() {
  type FormProps = ComponentProps<typeof Form<T>>
  const form = defineComponent<FormProps>((props: FormProps, { slots }) => {
    return () => h(Form, props as any, slots)
  })

  type FormGroupProps = ComponentProps<typeof FormGroup<T>>
  const formGroup = defineComponent<FormGroupProps>((props: FormGroupProps, { slots }) => {
    return () => h(FormGroup, props as any, slots)
  })

  return {
    Form: form,
    FormGroup: formGroup,
  }
}

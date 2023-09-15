import { Validation } from "@/models"
import { Ref, inject } from "vue"

export function modelValue(define_model_value: Ref<any>) {
  if (define_model_value.value !== undefined) {
    return define_model_value
  }

  const inject_model_value = inject("model_value") as Ref<any>
  return inject_model_value
}

export function validation(props: { validation?: Validation }) {
  if (props.validation) {
    return props.validation
  }

  const inject_validation = inject('validation') as Validation
  return inject_validation ?? new Validation()
}
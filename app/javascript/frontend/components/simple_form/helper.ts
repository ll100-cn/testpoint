import { Validation } from "@/models"
import { type LabelHTMLAttributes, type Ref, computed, inject, ref } from "vue"

export interface WrapperConfig {
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  control_id?: string

  label_wrap_class?: string
  control_wrap_class?: string
}

export interface ControlConfig {
  size?: 'default' | 'small' | 'large'
  disabled?: boolean
  control_id?: string
  input_class?: string[]
}

export interface GroupProps extends WrapperConfig {
}

export interface ControlProps {
  config?: ControlConfig
}

export function validation(props: { validation?: Validation }) {
  if (props.validation) {
    return ref(props.validation)
  }

  const inject_validation = inject('validation') as Ref<Validation>

  return inject_validation ?? ref(new Validation())
}

export function modelValue(define_model_value: Ref<any>) {
  if (define_model_value.value !== undefined) {
    return define_model_value
  }

  const inject_model_value = inject("model_value") as Ref<any>
  return inject_model_value
}

export function buildLabelAttrs(options: WrapperConfig) {
  return computed(() => {
    const attrs =  <LabelHTMLAttributes>{ class: [] }
    if (options.size == 'small') {
      attrs.class.push('col-form-label-sm')
    } else if (options.size == 'large') {
      attrs.class.push('col-form-label-lg')
    }

    if (options.control_id) {
      attrs.for = options.control_id
    }

    return attrs
  })
}

export function buildControlAttrs(options: Ref<ControlConfig>, validation: Ref<Validation>) {
  return computed(() => {
    const attrs = { class: [] } as any

    if (options.value.size == 'small') {
      attrs.class.push('form-control-sm')
    }

    if (options.value.size == 'large') {
      attrs.class.push('form-control-lg')
    }

    if (validation.value.isInvaild()) {
      attrs.class.push("is-invalid")
    }

    if (options.value.disabled) {
      attrs.disabled = true
    }

    if (options.value.control_id) {
      attrs.id = options.value.control_id
    }

    if (options.value.input_class) {
      attrs.class = attrs.class.concat(options.value.input_class)
    }

    return attrs
  })
}

export function buildControlConfig(props: ControlProps) {
  const default_control_config = inject('default_control_config') as Ref<ControlConfig>

  return computed(() => {
    return { ...default_control_config?.value, ...props.config }
  })
}
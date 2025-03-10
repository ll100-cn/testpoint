import _ from 'lodash'
import { computed, inject, type InjectionKey, type Ref } from "vue"
import { createProvideInject, createRelayPreseterConfig, compactObject } from "../utils"
import type Former from "./Former"
import Validation from "./Validation"

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];


export type SizeType = 'sm' | 'default' | 'lg'


export type FormPresenterConfig = {
  size?: SizeType
  disabled?: any
}

export type FormPresenter = {
  root(config: Partial<FormPresenterConfig>): string
  group(config: Partial<FormPresenterConfig>): string
  label(config: Partial<FormPresenterConfig>): string
  error(config: Partial<FormPresenterConfig>): string
}

export const {
  relayInjectPreseterConfig: relayInjectPreseterConfig
} = createRelayPreseterConfig<FormPresenterConfig>('form-presenter-config', {
  size: 'default',
  disabled: false,
})

export const {
  useInject: useFormPresenter,
  useProvide: provideFormPresenter
} = createProvideInject<Ref<FormPresenter>>('form-presenter')



export type ControlConfig = {
  id?: string
  validation?: Validation
}

export const FormerKey: InjectionKey<Former<any>> = Symbol('former')
export function useInjectFormer<T extends object>() {
  return inject(FormerKey) as Former<T> | undefined
}

export const ControlConfigKey: InjectionKey<Ref<ControlConfig>> = Symbol('control-config')
export function useInjectControlConfig(props: ControlConfig) {
  const injectControlConfig = inject(ControlConfigKey)

  const config = computed(() => {
    return {
      ...injectControlConfig?.value,
      ...compactObject(props),
    } satisfies ControlConfig
  })

  return config
}

export const ControlValueKey: InjectionKey<Ref<any>> = Symbol('model-value')
export function useInjectControlValue<T>(modelValue?: Ref<T | undefined>) {
  if (modelValue && modelValue.value !== undefined) {
    return modelValue as Ref<T>
  }

  const injectControlValue = inject(ControlValueKey, null)
  return injectControlValue ?? modelValue as Ref<T>
}

export interface FormPresenters {
}

export const {
  useInject: useFormPresenters,
  useProvide: provideFormPresenters
} = createProvideInject<FormPresenters>('Form-presenters')

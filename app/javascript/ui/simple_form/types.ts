import { inject, type InjectionKey, type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from "../utils"
import type Former from "./Former"

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
  control(config: Partial<FormPresenterConfig>): string
  error(config: Partial<FormPresenterConfig>): string
}

export const {
  relayInjectPresenterConfig: relayFormPresenterConfig
} = createRelayPresenterConfig<FormPresenterConfig>('form-presenter-config', {
  size: 'default',
  disabled: false,
})

export const {
  useInject: useFormPresenter,
  useProvide: provideFormPresenter
} = createProvideInject<Ref<FormPresenter>>('form-presenter')

export const {
  useInject: useFormer,
  useProvide: provideFormer
} = createProvideInject<Former<any>>('former')
export interface FormPresenters {
}

export const {
  useInject: useFormPresenters,
  useProvide: provideFormPresenters
} = createProvideInject<FormPresenters>('Form-presenters')


export const {
  useInject: useControlId,
  useProvide: provideControlId
} = createProvideInject<string>('control-id')

export const ControlValueKey: InjectionKey<Ref<any>> = Symbol('model-value')
export function useControlValue<T>(modelValue?: Ref<T | undefined>) {
  if (modelValue && modelValue.value !== undefined) {
    return modelValue as Ref<T>
  }

  const injectControlValue = inject(ControlValueKey, null)
  return injectControlValue ?? modelValue as Ref<T>
}

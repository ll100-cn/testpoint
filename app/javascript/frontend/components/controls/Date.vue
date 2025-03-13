<template>
  <DatePicker :input-id="controlId" unstyled :pt="pt" v-model="modelValue" date-format="yy-mm-dd" show-icon show-button-bar icon-display="input" />
</template>

<script lang="ts">
import { type HTMLAttributes } from 'vue'
import type { DatePickerPassThroughOptions } from 'primevue/datepicker'
import { useInputPresenters, type InputPresenter, type InputPresenterConfig } from '$ui/input'
import { useDropdownMenuPresenters, type DropdownMenuPresenter, type DropdownMenuPresenterConfig } from '$ui/dropdown-menu'
import { useButtonPresenters, type ButtonPresenter, type ButtonPresenterConfig, type ButtonPresenters } from '$ui/button'

export interface Props {
  class?: HTMLAttributes['class']
}

interface PassThroughEnv {
  inputPresenter: Ref<InputPresenter>
  inputPresenterConfig: Ref<InputPresenterConfig>
  dropdownMenuPresenter: Ref<DropdownMenuPresenter>
  dropdownMenuPresenterConfig: Ref<DropdownMenuPresenterConfig>
  buttonPresenters: ButtonPresenters
  buttonPresenterConfig: Ref<ButtonPresenterConfig>
}

export function buildPassThrough(env: PassThroughEnv) {
  return <DatePickerPassThroughOptions>{
    root: ({ props }) => {

      const result = {} as Record<string, any>

      result['class'] = cn("relative w-full")
      return result
    },
    pcInputText: () => {
      return {
        root: {
          class: cn(env.inputPresenter.value.input(env.inputPresenterConfig.value), "relative")
        }
      };
    },
    inputIconContainer: 'absolute top-1/2 right-3 -translate-y-1/2 opacity-50',
    dropdownIcon: {
      "data-name": "DropdownIcon",
        class: ['absolute top-[50%] -mt-2', 'text-surface-600 dark:text-surface-200', 'right-[.75rem]']
    },
    dropdown: {
      "data-name": "Dropdown",
        class: ['relative w-10', 'items-center inline-flex text-center align-bottom justify-center', 'rounded-r-md', 'px-4 py-3 leading-none', 'text-primary-inverse', 'bg-primary', 'border border-primary', 'focus:outline-hidden focus:outline-offset-0 focus:ring', 'hover:bg-primary-hover hover:border-primary-hover', 'focus:ring-primary-400/50 dark:focus:ring-primary-300/50']
    },
    panel: () => {
      const result = {} as Record<string, any>
      result["class"] = cn(env.dropdownMenuPresenter.value.content(env.dropdownMenuPresenterConfig.value), "!min-w-fit !w-fit p-0")
      return result
    },
    header: {
      class: `
        flex items-center justify-between
        font-semibold p-2 border-b border-input
      `
    },
    selectMonth: () => ({
      class: cn(env.buttonPresenters.ghost.root({ variant: "secondary", size: "sm" }), "!text-size-inherit !font-weight-inherit text-foreground -me-1")
    }),
    selectYear: () => ({
      class: cn(env.buttonPresenters.ghost.root({ variant: "secondary", size: "sm" }), "!text-size-inherit !font-weight-inherit text-foreground -ms-1")
    }),
    pcPrevButton: () => ({
      root: {
        class: cn(env.buttonPresenters.ghost.root({ variant: "secondary", size: "sm" }), "!text-size-inherit !font-weight-inherit text-foreground px-2")
      },
      label: { class: 'hidden' }
    }),
    pcNextButton: () => ({
      root: {
        class: cn(env.buttonPresenters.ghost.root({ variant: "secondary", size: "sm" }), "!text-size-inherit !font-weight-inherit text-foreground px-2")
      },
      label: { class: 'hidden' }
    }),
    buttonbar: {
      class: `
        flex items-center justify-between
        p-2 border-t border-input
      `
    },
    pcTodayButton: () => ({
      root: {
        class: cn(env.buttonPresenters.ghost.root({ variant: "primary", size: "sm" }), "!text-size-inherit !font-weight-inherit text-foreground px-2")
      },
    }),
    pcClearButton: () => ({
      root: {
        class: cn(env.buttonPresenters.ghost.root({ variant: "destructive", size: "sm" }), "!text-size-inherit !font-weight-inherit text-foreground px-2")
      },
    }),
    dayView: {
      class: [ 'my-2' ]
    },
    tableHeaderCell: {
      class: ['font-normal']
    },
    weekHeader: {
      class: ['border-r border-input text-center text-slient px-1 font-normal']
    },
    weekNumber: {
      class: ['border-r border-input text-center text-slient px-1']
    },
    weekLabelContainer: {
      class: [ '*:data-[pc-section=weeklabel]:hidden' ]
    },
    dayCell: {
      class: ['py-0.5 px-1']
    },
    day: ({ context }) => {
      const attrs = {
        class: cn(`
          flex items-center justify-center mx-auto size-8 rounded-full
          text-foreground cursor-pointer
          focus:outline-hidden focus:outline-offset-0 focus:ring focus:ring-ring/50
          hover:bg-accent
          data-[today]:text-primary
          data-[other-month]:text-secondary
          data-[selected]:bg-primary data-[selected]:text-primary-foreground
          data-[disabled]:text-muted data-[disabled]:opacity-60 data-[disabled]:cursor-default
        `),
      } as Record<string, any>

      if (context.today && !context.selected) {
        attrs['data-today'] = context.today
      }

      if (context.otherMonth) {
        attrs['data-other-month'] = context.otherMonth
      }

      if (context.disabled) {
        attrs['data-disabled'] = context.disabled
      }

      if (context.selected) {
        attrs['data-selected'] = context.selected
      }

      return attrs
    },
    monthView: {
      class: ['grid grid-cols-3 px-2']
    },
    month: ({ context }) => {
      const attrs = {
        class: cn(`
          flex items-center justify-center rounded-md
          px-3 py-1 min-w-[6em]
          text-foreground cursor-pointer
          focus:outline-hidden focus:outline-offset-0 focus:ring focus:ring-ring/50
          hover:bg-accent
          data-[today]:text-primary
          data-[other-month]:text-secondary
          data-[selected]:bg-primary data-[selected]:text-primary-foreground
          data-[disabled]:text-muted data-[disabled]:opacity-60 data-[disabled]:cursor-default
        `),
      } as Record<string, any>

      if (context.today && !context.selected) {
        attrs['data-today'] = context.today
      }

      if (context.disabled) {
        attrs['data-disabled'] = context.disabled
      }

      if (context.selected) {
        attrs['data-selected'] = context.selected
      }

      return attrs
    },
    yearView: {
      class: ['grid grid-cols-3 px-2']
    },
    year: ({ context }) => {
      const attrs = {
        class: cn(`
          flex items-center justify-center rounded-md
          px-3 py-1 min-w-[6em]
          text-foreground cursor-pointer
          focus:outline-hidden focus:outline-offset-0 focus:ring focus:ring-ring/50
          hover:bg-accent
          data-[today]:text-primary
          data-[other-month]:text-secondary
          data-[selected]:bg-primary data-[selected]:text-primary-foreground
          data-[disabled]:text-muted data-[disabled]:opacity-60 data-[disabled]:cursor-default
        `),
      } as Record<string, any>

      if (context.today && !context.selected) {
        attrs['data-today'] = context.today
      }

      if (context.disabled) {
        attrs['data-disabled'] = context.disabled
      }

      if (context.selected) {
        attrs['data-selected'] = context.selected
      }

      return attrs
    },
    timePicker: {
      class: [ 'flex justify-center items-center border-t border-input p-2' ]
    },
    pcIncrementButton: {
      root: {
        "data-name": "IncrementButton",
        class: cn(env.buttonPresenters.ghost.root({ variant: "secondary", size: "sm" }), "!text-size-inherit !font-weight-inherit text-foreground h-auto py-1")
      },
      label: { class: 'hidden' }
    },
    pcDecrementButton: {
      root: {
        "data-name": "DecrementButton",
        class: cn(env.buttonPresenters.ghost.root({ variant: "secondary", size: "sm" }), "!text-size-inherit !font-weight-inherit text-foreground h-auto py-1")
      },
      label: { class: 'hidden' }
    },
    separatorContainer: {
      class: ['flex items-center flex-col px-2 text-xl']
    },
    hourPicker: {
      class: ['flex items-center flex-col px-2']
    },
    minutePicker: {
      class: ['flex items-center flex-col px-2']
    },
    secondPicker: {
      class: ['flex items-center flex-col px-2']
    },
    ampmPicker: {
      class: ['flex items-center flex-col px-2']
    },
  }
}
</script>

<script setup lang="ts">
import { cn } from '$ui/utils'
import { relayFormPresenterConfig, useControlId, useControlValue, type FormPresenterConfig } from "$ui/simple_form"
import dayjs from 'dayjs'
import DatePicker from 'primevue/datepicker'
import { computed, type Ref } from 'vue'

interface Props {
}

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {})

const defaultModelValue = defineModel<string | null>()
const rawModelValue = useControlValue(defaultModelValue)
const presenterConfig = relayFormPresenterConfig(props)
const controlId = useControlId()

const modelValue = computed({
  get: () => {
    if (rawModelValue.value == null) {
      return null
    } else {
      return dayjs(rawModelValue.value, 'YYYY-MM-DD').toDate()
    }
  },
  set: (value: Date | null) => {
    if (value == null) {
      rawModelValue.value = null
    } else {
      rawModelValue.value = dayjs(value).format('YYYY-MM-DD')
    }
  }
})

const buttonPresenters = useButtonPresenters()
const buttonPresenterConfig = computed(() => {
  const config = <ButtonPresenterConfig>{}
  config.size = presenterConfig.value.size ?? 'default'
  return config
})

const inputPresenters = useInputPresenters()
const inputPresenter = computed(() => inputPresenters.standard)
const inputPresenterConfig = computed(() => {
  const config = <InputPresenterConfig>{}
  config.size = presenterConfig.value.size ?? 'default'
  return config
})

const dropdownMenuPresenters = useDropdownMenuPresenters()
const dropdownMenuPresenter = computed(() => dropdownMenuPresenters.standard)
const dropdownMenuPresenterConfig = computed(() => {
  const config = <DropdownMenuPresenterConfig>{}
  return config
})

const pt = buildPassThrough({
  inputPresenter,
  inputPresenterConfig,
  dropdownMenuPresenter,
  dropdownMenuPresenterConfig,
  buttonPresenters,
  buttonPresenterConfig
})
</script>

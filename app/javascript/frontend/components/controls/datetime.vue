<template>
  <DatePicker unstyled :pt="pt" v-model="modelValue" date-format="yy-mm-dd" show-time show-icon select-other-months show-button-bar icon-display="input" />
</template>

<script setup lang="ts">
import { useButtonPresenters, type ButtonPresenterConfig } from "$ui/button"
import { useDropdownMenuPresenters, type DropdownMenuPresenterConfig } from "$ui/dropdown-menu"
import { useInputPresenters, type InputPresenterConfig } from "$ui/input"
import { relayFormPresenterConfig, useInjectControlValue, type FormPresenterConfig } from "$ui/simple_form"
import dayjs from "dayjs"
import DatePicker from 'primevue/datepicker'
import { computed } from "vue"
import { buildPassThrough } from './Date.vue'

interface Props {
}

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {})

const defaultModelValue = defineModel<string | null>()
const presenterConfig = relayFormPresenterConfig(props)
const rawModelValue = useInjectControlValue(defaultModelValue)

const modelValue = computed({
  get: () => {
    if (rawModelValue.value == null) {
      return null
    } else {
      return dayjs(rawModelValue.value, 'YYYY-MM-DD HH:mm').toDate()
    }
  },
  set: (value: Date | null) => {
    if (value == null) {
      rawModelValue.value = null
    } else {
      rawModelValue.value = dayjs(value).format('YYYY-MM-DD HH:mm')
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

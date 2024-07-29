<template>
  <FormErrorAlert />

  <div class="space-y-4">
    <FormGroup path="name" label="名称">
      <controls.string />
    </FormGroup>
    <FormGroup path="description" label="描述">
      <controls.text />
    </FormGroup>
    <FormGroup path="color" label="颜色">
      <controls.color />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
}>()

const { FormGroup } = FormFactory<typeof props.former.form>()
</script>

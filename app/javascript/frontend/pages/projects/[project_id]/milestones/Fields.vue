<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="title" label="标题"><controls.string /></FormGroup>
    <FormGroup path="published_at" label="发布时间"><controls.datetime /></FormGroup>
    <FormGroup path="description" label="描述"><controls.text /></FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
}>()

const { FormGroup } = FormFactory<typeof props.former.form>()
</script>

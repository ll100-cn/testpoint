<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="name" label="名称"><controls.string /></FormGroup>
    <FormGroup path="description" label="描述"><controls.text /></FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as controls from '@/components/controls'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'

const props = defineProps<{
  former: Former<any>
}>()

const { FormGroup } = FormFactory<typeof props.former.form>()

</script>

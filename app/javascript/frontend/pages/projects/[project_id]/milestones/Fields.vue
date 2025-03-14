<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="title" label="标题"><controls.String /></FormGroup>
    <FormGroup path="published_at" label="发布时间"><controls.Datetime /></FormGroup>
    <FormGroup path="description" label="描述"><controls.Text /></FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
}>()

const Form = GenericForm<typeof props.former.form>
const FormGroup = GenericFormGroup<typeof props.former.form>
</script>

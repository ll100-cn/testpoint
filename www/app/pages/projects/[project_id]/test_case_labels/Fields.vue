<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="name" label="名称"><controls.String /></FormGroup>
    <FormGroup path="description" label="描述"><controls.Text /></FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as controls from '@/components/controls'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'

const props = defineProps<{
  former: Former<any>
}>()

const Form = GenericForm<typeof props.former.form>
const FormGroup = GenericFormGroup<typeof props.former.form>

</script>

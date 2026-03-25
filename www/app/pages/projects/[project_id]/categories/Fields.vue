<template>
  <FormErrorAlert />

  <div class="space-y-4">
    <FormGroup path="name" label="名称">
      <controls.String />
    </FormGroup>
    <FormGroup path="description" label="描述">
      <controls.Text />
    </FormGroup>
    <FormGroup path="color" label="颜色">
      <controls.Color />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
}>()

const FormGroup = GenericFormGroup<typeof props.former.form>
</script>

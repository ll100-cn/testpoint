<template>
  <div class="gap-y-3">
    <FormErrorAlert />

    <FormGroup path="name" label="名称">
      <controls.String />
    </FormGroup>

    <FormGroup path="webhook_url" label="webhook_url">
      <controls.String />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import { Former, GenericForm, GenericFormGroup } from "$ui/simple_form";
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
}>()

const FormGroup = GenericFormGroup<typeof props.former.form>
</script>

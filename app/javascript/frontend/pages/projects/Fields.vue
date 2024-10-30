<template>
  <div class="gap-y-3">
    <FormErrorAlert />

    <FormGroup path="name" label="名称">
      <controls.string />
    </FormGroup>

    <FormGroup path="webhook_url" label="webhook_url">
      <controls.string />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import { Former, FormFactory } from "@/ui";
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
}>()

const { FormGroup } = FormFactory<typeof props.former.form>()
</script>

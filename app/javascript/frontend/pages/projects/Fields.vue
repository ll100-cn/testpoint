<template>
  <FormErrorAlert />

  <layouts.group v-slot="slotProps" code="name" label="名称">
    <forms.string v-bind="{ ...slotProps, form: former.form }" />
  </layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { forms, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"

const props = defineProps<{
  former: Former<Record<string, any>>
}>()
</script>

<template>
  <FormErrorAlert />

  <layouts.group v-slot="slotProps" code="email" label="用户邮箱">
    <div v-if="props.mode == 'edit'" class="form-control-plaintext">{{ former.form.email }}</div>
    <forms.string v-else v-bind="{ ...slotProps, form: former.form }" />
  </layouts.group>
  <layouts.group v-slot="slotProps" code="name" label="名称">
    <forms.string v-bind="{ ...slotProps, form: former.form }" />
  </layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Validations, forms, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"

const props = defineProps<{
  mode?: "edit" | "new"
  former: Former<Record<string, any>>
}>()
</script>

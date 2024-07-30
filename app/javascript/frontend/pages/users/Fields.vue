<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <FormGroup path="email" label="用户邮箱">
      <div v-if="props.mode == 'edit'" class="form-control-plaintext">{{ former.form.email }}</div>
      <controls.string v-else />
    </FormGroup>
    <FormGroup path="name" label="名称">
      <controls.string />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as controls from '@/components/controls'
import { Former, FormFactory } from "$vendor/ui";

const props = defineProps<{
  mode?: "edit" | "new"
  former: Former<any>
}>()

const { FormGroup } = FormFactory<typeof props.former.form>()
</script>

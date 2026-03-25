<template>
  <FormErrorAlert />

  <div class="gap-x-3">
    <FormGroup path="email" label="用户邮箱">
      <div v-if="props.mode == 'edit'" class="form-control-plaintext">{{ former.form.email }}</div>
      <controls.String v-else />
    </FormGroup>
    <FormGroup path="name" label="名称">
      <controls.String />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as controls from '@/components/controls'
import { Former, GenericForm, GenericFormGroup } from "$ui/simple_form";

const props = defineProps<{
  mode?: "edit" | "new"
  former: Former<any>
}>()

const Form = GenericForm<typeof props.former.form>
const FormGroup = GenericFormGroup<typeof props.former.form>
</script>

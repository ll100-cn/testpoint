<template>
  <FormErrorAlert :validations="validations" />

  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('user_email')" label="用户邮箱">
    <div v-if="props.mode == 'edit'" class="form-control-plaintext">{{ form.user_email }}</div>
    <forms.string v-else v-bind="{ ...slotProps, form}" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('nickname')" label="昵称">
    <forms.string v-bind="{ ...slotProps, form }" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('role')" label="角色">
    <forms.select v-bind="{ ...slotProps, form, collection: role_collection, labelMethod: 'label', valueMethod: 'value', includeBlank: true }" />
  </layouts.vertical_group>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { Validations, forms, layouts } from "@/components/simple_form"

import FormErrorAlert from '@/components/FormErrorAlert.vue'

const props = defineProps<{
  form: any
  project_id: string
  validations: Validations
  mode?: "edit" | "new"
}>()

const role_collection = ref([
  { "label": "负责人", "value": "owner" },
  { "label": "管理员", "value": "manager" },
  { "label": "开发人员", "value": "developer" },
  { "label": "报告人", "value": "reporter" }
])

</script>

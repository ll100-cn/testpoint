<template>
  <FormErrorAlert />

  <layouts.group code="user_email" label="用户邮箱">
    <div v-if="props.mode == 'edit'" class="form-control-plaintext">{{ former.form.user_email }}</div>
    <forms.string v-else />
  </layouts.group>
  <layouts.group code="nickname" label="昵称">
    <forms.string />
  </layouts.group>
  <layouts.group code="role" label="角色">
    <forms.select v-bind="{ collection: role_collection, labelMethod: 'label', valueMethod: 'value', includeBlank: true }" />
  </layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { forms, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { ref } from "vue"

const props = defineProps<{
  former: Former<Record<string, any>>
  project_id: string
  mode?: "edit" | "new"
}>()

const role_collection = ref([
  { "label": "负责人", "value": "owner" },
  { "label": "管理员", "value": "manager" },
  { "label": "开发人员", "value": "developer" },
  { "label": "报告人", "value": "reporter" }
])

</script>

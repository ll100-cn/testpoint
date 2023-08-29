<template>
  <FormExtraErrorAlert :validations="validations" />

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
import { getCurrentInstance, ref } from "vue";

import { Validations, forms, layouts } from "@/components/simple_form"
import * as requests from '@/requests'

import FormExtraErrorAlert from '@/components/FormExtraErrorAlert.vue'

const { proxy } = getCurrentInstance()
const props = defineProps<{
  form: any
  project_id: string
  validations: Validations
  mode?: "edit" | "new"
}>()

const role_collection = ref(await new requests.MemberRoleList().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform())

</script>

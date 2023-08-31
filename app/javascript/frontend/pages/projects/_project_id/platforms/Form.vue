<template>
  <FormErrorAlert :validations="validations" />

  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('name')" label="名称">
    <forms.string v-bind="{ ...slotProps, form}" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('default_assignee_id')" label="建议工单受理人">
    <forms.select v-bind="{ ...slotProps, form, collection: availiable_members, labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.vertical_group>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Validations, forms, layouts } from "@/components/simple_form"

import { Member } from '@/models'
import _ from 'lodash'

import FormErrorAlert from '@/components/FormErrorAlert.vue'

const props = defineProps<{
  form: any
  project_id: string
  validations: Validations
  members: Member[]
}>()

const availiable_members = computed(() => {
  return _(props.members).reject([ 'role', 'reporter' ]).sortBy('developer').groupBy('role_text').value()
})
</script>

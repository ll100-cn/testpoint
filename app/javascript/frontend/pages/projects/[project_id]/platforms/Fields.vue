<template>
  <FormErrorAlert />

  <layouts.group v-slot="slotProps" label_class="col-2" code="name" label="名称">
    <forms.string v-bind="{ ...slotProps, form: former.form }" />
  </layouts.group>
  <layouts.group v-slot="slotProps" label_class="col-2" code="default_assignee_id" label="建议工单受理人">
    <forms.select v-bind="{ ...slotProps, form: former.form, collection: availiable_members, labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { forms, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { Member } from '@/models'
import _ from 'lodash'
import { computed } from "vue"

const props = defineProps<{
  former: Former<Record<string, any>>
  project_id: string
  members: Member[]
}>()

const availiable_members = computed(() => {
  return _(props.members).reject([ 'role', 'reporter' ]).sortBy('developer').groupBy('role_text').value()
})
</script>

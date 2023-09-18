<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <layouts.group code="name" label="名称">
      <controls.string />
    </layouts.group>
    <layouts.group code="default_assignee_id" label="建议工单受理人">
      <controls.select v-bind="{ collection: availiable_members, labelMethod: 'name', valueMethod: 'id' }" />
    </layouts.group>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
import { Member } from '@/models'
import _ from 'lodash'
import { computed } from "vue"

const props = defineProps<{
  project_id: string
  members: Member[]
}>()

const availiable_members = computed(() => {
  return _(props.members).reject([ 'role', 'reporter' ]).sortBy('developer').groupBy('role_text').value()
})
</script>

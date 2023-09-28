<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <!-- <layouts.group code="category_id" label="分类">
      <controls.select v-bind="{ collection: categories, labelMethod: 'name', valueMethod: 'id' }" />
    </layouts.group> -->
    <layouts.group code="title" label="工单标题"><controls.string /></layouts.group>
    <layouts.group code="content" label="工单内容"><controls.markdown /></layouts.group>
    <!-- <layouts.group code="state" label="状态">
      <controls.select v-bind="{ collection: issue_state_mapping_collection, labelMethod: 'label', valueMethod: 'value' }" />
    </layouts.group>
    <layouts.group code="assignee_id" label="工单受理人">
      <controls.select v-bind="{ collection: assignees_collection, labelMethod: 'name', valueMethod: 'id', includeBlank: true }" />
    </layouts.group> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { controls, layouts } from "@/components/simple_form"
import { ISSUE_STATE_MAPPING } from '@/constants'
import { Category, IssueTemplate, Member, TaskUpshot } from '@/models'
import _ from "lodash"

import FormErrorAlert from './FormErrorAlert.vue'

const props = withDefaults(defineProps<{
  issue_templates: IssueTemplate[]
  project_id: number
  plan_id: number
  members: Member[]
  categories: Category[]
}>(), {
})

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
}>()

const issue_state_mapping_collection = computed(() => {
  return _.map(ISSUE_STATE_MAPPING, (value, key) => {
    return { label: value, value: key }
  })
})

const assignees_collection = computed(() => {
  return _(props.members).reject([ 'role', 'reporter' ]).sortBy('developer').groupBy('role_text').value()
})

</script>

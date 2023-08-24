<template>
  <FormExtraErrorAlert :validations="validations" />

  <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('issue_template_id')" label="选择模版">
    <forms.select v-bind="{ ...slotProps, form, collection: issue_templates, labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.horizontal_group>
  <!-- <template v-if="form.issue_template_id"> -->
    <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('title')" label="工单标题">
      <forms.string v-bind="{ ...slotProps, form }" />
    </layouts.horizontal_group>
    <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('content')" label="工单内容">
      <forms.markdown v-bind="{ ...slotProps, form }" />
    </layouts.horizontal_group>
    <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('state')" label="状态">
      <forms.string v-bind="{ ...slotProps, form }" />
    </layouts.horizontal_group>
    <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('assignee_id')" label="工单受理人">
      <forms.string v-bind="{ ...slotProps, form }" />
    </layouts.horizontal_group>
  <!-- </template> -->
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";

import { Validations, forms, layouts } from "@/components/simple_form";
import { IssueTemplate, TaskUpshot } from '@/models';

import FormExtraErrorAlert from './FormExtraErrorAlert.vue';

const { proxy } = getCurrentInstance()
const route = useRoute()

const props = withDefaults(defineProps<{
  issue_templates: IssueTemplate[]
  validations: Validations
  project_id: number
  plan_id: number
  form: object
}>(), {
})

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
}>()

</script>

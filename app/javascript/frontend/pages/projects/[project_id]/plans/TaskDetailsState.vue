<template>
  <ul>
    <template v-for="line in time_lines" :key="line.id">
      <li v-if="(line instanceof TaskUpshotInfo)" :style="{ listStyleType: current_phase_id == line.phase_id ? 'disclosure-closed' : 'initial'}">
        <div class="d-flex align-items-center">
          <span class="me-2">{{ _.find(phase_infos, { id: line.phase_id }).title }}</span>
          <template v-if="line.state_override">
            <template v-for="(state, key) in task_state_style_mapping" :key="state">
              <span v-if="key == line.state_override" :class="state.class_name">
                {{ state.text }} <i :class="state.icon" />
              </span>
            </template>
          </template>
          <span v-else>未操作</span>
          <small class="text-muted ms-auto">{{ utils.humanize(line.state_changed_at, DATE_SHORT_FORMAT) }}</small>
        </div>
      </li>
      <li v-if="(line instanceof Issue)" class="ms-3">
        <router-link class="me-3" :to="`/projects/${project_id}/issues/${line.id}`">{{ `#${line.id} ${line.title}` }}</router-link>
        <IssueStateBadge :issue_state="line.state" />
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { useRoute } from "vue-router"

import { DATE_SHORT_FORMAT } from '@/constants'
import * as utils from "@/lib/utils"
import { Issue, PhaseInfo, TaskInfo, TaskUpshot, TaskUpshotInfo } from '@/models'
import _ from 'lodash'

import IssueStateBadge from '@/components/IssueStateBadge.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()

const props = withDefaults(defineProps<{
  task_info: TaskInfo
  current_phase_id: number
  phase_infos: PhaseInfo[]
  project_id: number
}>(), {
})

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
  "update:is_task_pass": [is_task_pass: boolean]
}>()

const task_state_style_mapping = {
  "pass": {
    icon: "far fa-check",
    class_name: "text-success",
    text: "通过"
  },
  "failure": {
    icon: "far fa-times",
    class_name: "text-danger",
    text: "不通过"
  },
  "pending": {
    icon: "far fa-circle",
    class_name: "text-muted",
    text: "待测试"
  }
}

const time_lines = computed(() => {
  return _.orderBy([ ...props.task_info?.task_upshots ?? [], ...props.task_info?.issues ?? [] ], [ "created_at" ])
})
</script>

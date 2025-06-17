<template>
  <ul>
    <template v-for="{ phase_info, task_upshot, issues } in items">
      <li :style="{ listStyleType: current_phase_id == task_upshot.phase_id ? 'disclosure-closed' : 'initial'}">
        <div class="flex items-center">
          <span class="me-2">{{ phase_info.phase.title }}</span>

          <TaskStateLabel v-if="task_upshot.state_override" :state="task_upshot.state_override" />
          <span v-else>未操作</span>

          <small class="text-muted ms-auto">{{ h.datetime(task_upshot.state_changed_at) }}</small>
        </div>
        <ul v-if="issues.length > 0">
          <li v-for="issue in issues">
            <IssueRichLink :issue="issue" />
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import IssueRichLink from '@/components/IssueRichLink.vue'
import TaskStateLabel from '@/components/TaskStateLabel.vue'
import * as h from '@/lib/humanize'
import { Issue, PhaseInfo, type TaskBox, TaskUpshot } from '@/models'
import _ from 'lodash'
import { computed } from 'vue'

const props = defineProps<{
  task_box: TaskBox
  current_phase_id: number
  phase_infos: PhaseInfo[]
}>()

interface Item {
  phase_info: PhaseInfo
  task_upshot: TaskUpshot
  issues: Issue[]
}

const items = computed(() => {
  const result = [] as Item[]
  const phase_info_repo = _.keyBy(props.phase_infos, it => it.phase.id)

  for (const task_upshot of _.orderBy(props.task_box.task_upshots ?? [], it => it.created_at)) {
    const phase_info = phase_info_repo[task_upshot.phase_id]
    result.push({ phase_info, task_upshot, issues: []})
  }

  for (const issue of _.orderBy(props.task_box.issues ?? [], it => it.created_at)) {
    const index = _.findLastIndex(result, it => it.task_upshot.created_at <= issue.created_at)
    if (index == -1) {
      result[0].issues.push(issue)
    } else {
      result[index].issues.push(issue)
    }
  }

  return result
})

</script>

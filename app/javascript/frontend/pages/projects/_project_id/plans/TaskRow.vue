<template>
  <div class="card mb-2">
    <div class="card-body d-flex align-items-center py-2 px-2">

      <span class="me-3">
        <i class="far fa-clipboard-check text-muted" v-if="task_upshot_info.state_override"></i>
        <i class="far fa-clipboard" style="opacity: 0.25;" v-else></i>
      </span>

      <div class="small me-3">
        <TaskStateWithIcon :state="task_upshot_info.state" />
      </div>

      <span class="me-auto">
        <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
        {{ test_case.title }}
      </span>


      <a class="stretched-link" data-bs-target="#applicationModal" data-bs-toggle="modal"
        :data-url="`${RAILS_RELATIVE_URL_ROOT}projects/${test_case.project_id}/plans/${task.plan_id}/tasks/${task.id}/upshots/${task_upshot_info.id}`" href="#"></a>

      <a class="d-none" :class="`task_${task.id}_on`" @click.passive="onTaskChanged" href="#">refresh-self</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskUpshotInfo } from '@/models';
import { PropType, computed } from 'vue'
import TaskStateWithIcon from './TaskStateWithIcon.vue';

const RAILS_RELATIVE_URL_ROOT = process.env.RAILS_RELATIVE_URL_ROOT
const props = defineProps({
  task_upshot_info: {
    type: Object as PropType<TaskUpshotInfo>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'change', task_upshot_info: TaskUpshotInfo): void
}>()

const test_case = computed(() => props.task_upshot_info.test_case)
const task = computed(() => props.task_upshot_info.task)

async function onTaskChanged() {
  emit('change', props.task_upshot_info)
}

</script>

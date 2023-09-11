<template>
  <div class="card mb-2 c-pointer" @click="emit('click', task_upshot_info)">
    <div class="card-body d-flex align-items-center py-2 px-2">
      <span class="me-3">
        <i v-if="task_upshot_info.state_override" class="far fa-clipboard-check text-muted" />
        <i v-else class="far fa-clipboard" style="opacity: 0.25" />
      </span>

      <div class="small me-3" style="width: 4rem;">
        <TaskStateWithIcon :state="task_upshot_info.is_ignored() ? 'ignore' : task_upshot_info.state" />
      </div>

      <span class="me-auto">
        <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
        {{ test_case.title }}
      </span>

      <a class="d-none" :class="`task_${task.id}_on`" href="#" @click.passive="onTaskChanged">refresh-self</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskUpshotInfo } from '@/models';
import { PropType, computed } from 'vue';
import TaskStateWithIcon from './TaskStateWithIcon.vue';

const props = defineProps({
  task_upshot_info: {
    type: Object as PropType<TaskUpshotInfo>,
    required: true
  }
})

const emit = defineEmits<{
  click: [task_upshot_info: TaskUpshotInfo]
  change: [task_upshot_info: TaskUpshotInfo]
}>()

const test_case = computed(() => props.task_upshot_info.test_case)
const task = computed(() => props.task_upshot_info.task)

async function onTaskChanged() {
  emit('change', props.task_upshot_info)
}

</script>

<template>
  <div class="card mb-2 c-pointer" @click="emit('click', task_upshot_info)">
    <div class="card-body d-flex align-items-center py-2 px-2">
      <span class="me-3">
        <i v-if="task_upshot_info.state_override" class="far fa-clipboard-check text-muted" />
        <i v-else class="far fa-clipboard" style="opacity: 0.25" />
      </span>

      <div class="small me-3" style="width: 4rem;">
        <span v-if="task_upshot_info.task.ignore_at" class="text-secondary">
          已忽略 <i class="far fa-eye-slash"></i>
        </span>
        <TaskStateLabel v-else :state="task_upshot_info.state" />

      </div>

      <span class="me-auto">
        <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
        {{ test_case.title }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskUpshotInfo } from '@/models'
import { computed } from 'vue'
import TaskStateLabel from '@/components/TaskStateLabel.vue'

const props = defineProps<{
  task_upshot_info: TaskUpshotInfo
}>()

const emit = defineEmits<{
  click: [task_upshot_info: TaskUpshotInfo]
}>()

const test_case = computed(() => props.task_upshot_info.test_case)
</script>

<template>
  <Card class="mb-2 c-pointer" @click="emit('click', task_upshot_box)">
    <CardContent class="py-2 px-2 flex">
      <span class="me-3">
        <i v-if="task_upshot_box.task_upshot.state_override" class="far fa-clipboard-check text-muted" />
        <i v-else class="far fa-clipboard" style="opacity: 0.25" />
      </span>

      <div class="small me-3" style="width: 5rem;">
        <span v-if="task_upshot_box.task?.ignore_at" class="text-secondary">
          已忽略 <i class="far fa-eye-slash"></i>
        </span>
        <TaskStateLabel v-else :state="task_upshot_box.task_upshot.state" />
      </div>

      <span class="me-auto">
        <span v-if="test_case?.group_name" class="me-1">[{{ test_case?.group_name }}]</span>
        {{ test_case?.title }}
      </span>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '$ui/card';
import TaskStateLabel from '@/components/TaskStateLabel.vue';
import type { TaskUpshotBox } from '@/models';
import { computed } from 'vue';

const props = defineProps<{
  task_upshot_box: TaskUpshotBox
}>()

const emit = defineEmits<{
  click: [task_upshot_box: TaskUpshotBox]
}>()

const test_case = computed(() => props.task_upshot_box.test_case)
</script>

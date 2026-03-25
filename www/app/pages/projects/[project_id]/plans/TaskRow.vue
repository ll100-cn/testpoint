<template>
  <Card class="mb-2 c-pointer" @click.prevent="emit('show', task_upshot_box)">
    <CardContent class="py-2 px-2 flex">
      <span class="me-3">
        <i v-if="task_upshot_box.taskUpshot.stateOverride" class="far fa-clipboard-check text-muted" />
        <i v-else class="far fa-clipboard" style="opacity: 0.25" />
      </span>

      <div class="small me-3" style="width: 5rem;">
        <span v-if="task_upshot_box.task?.ignoreAt" class="text-secondary">
          已忽略 <i class="far fa-eye-slash"></i>
        </span>
        <TaskStateLabel v-else :state="task_upshot_box.taskUpshot.state" />
      </div>

      <span class="me-auto">
        <span v-if="test_case?.groupName" class="me-1">[{{ test_case?.groupName }}]</span>
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
  show: [ TaskUpshotBox ]
}>()

const test_case = computed(() => props.task_upshot_box.testCase)
</script>

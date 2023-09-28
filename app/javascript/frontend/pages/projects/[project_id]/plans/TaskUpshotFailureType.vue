<template>
  <h6>选择追加操作</h6>

  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" v-model="model_value" :value="null">
      无
    </label>
  </div>

  <div v-for="issue in task_info.issues" class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" v-model="model_value" :value="issue.id">
      追加评论
    </label>

    <IssueRichLink :issue="issue" />
  </div>

  <div class="form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" v-model="model_value" value="new_issue">
      添加新问题
    </label>
  </div>
</template>

<script setup lang="ts">
import IssueRichLink from '@/components/IssueRichLink.vue'
import { TaskInfo } from '@/models'

export type ModalValue = 'new_issue' | number | null
const model_value = defineModel<ModalValue>()

const props = defineProps<{
  task_info: TaskInfo
}>()
</script>
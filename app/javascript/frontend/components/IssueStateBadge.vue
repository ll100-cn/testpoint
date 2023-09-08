<template>
  <span v-if="issue_state" v-tooltip:top="helper_tooltip_text" class="badge" :class="[css_class, color]">
    {{ text }}
  </span>
  <span v-else>
    无
  </span>
</template>

<script setup lang="ts">
import { ISSUE_STATE_MAPPING } from '@/constants'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  issue_state: string
  options?: any
}>(), {
  options: () => ({}),
})

const color = computed(() => {
  const colors = {
    pending: "bg-danger",
    waiting: "bg-warning",
    confirmed: "bg-warning",
    processing: "bg-info",
    processed: "bg-success",
    deploying: "bg-success",
    resolved: "bg-secondary",
    archived: "bg-light text-body",
    closed: "bg-light text-body"
  }
  return colors[props.issue_state]
})

const text = computed(() => {
  let text = ""
  if (typeof props.issue_state === "string") {
    text = ISSUE_STATE_MAPPING[props.issue_state]
  } else {
    text = props.issue_state
  }
  return text ?? props.issue_state
})

const helper_tooltip_text = computed(() => {
  const tooltipTexts = {
    pending: "该问题尚未确认，等待测试人员确认后开始处理",
    waiting: "暂时无法确认问题，需要报告人提供更多信息",
    confirmed: "已确认存在该问题，准备分配给开发人员处理",
    processing: "开发人员已知晓，正在处理",
    processed: "开发人员已初步解决该问题，等待测试并发布程序",
    deploying: "测试显示该问题已修复，即将发布到正式服务器",
    resolved: "程序问题已修复，等待报告人确认后将归档该工单",
    archived: "问题已全部处理完毕，无需再做任何操作",
    closed: "问题无效或重复，不作处理"
  }
  return tooltipTexts[props.issue_state]
})

const css_class = computed(() => props.options.class)
</script>

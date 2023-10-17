<template>
  <span v-if="state" v-tooltip:top="helper_tooltip_text" class="badge" :class="css_class" :style="{backgroundColor: utils.calcColorHex(state)}">
    {{ text }}
  </span>
  <span v-else>
    无
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"
import * as utils from "@/lib/utils"
import { ISSUE_STATE_MAPPING } from "@/constants"

const props = withDefaults(defineProps<{
  state: string
  options?: any
}>(), {
  options: () => ({}),
})

const text = computed(() => {
  let text = ""
  if (typeof props.state === "string") {
    text = ISSUE_STATE_MAPPING[props.state]
  } else {
    text = props.state
  }
  return text ?? props.state
})

const helper_tooltip_text = computed(() => {
  const tooltipTexts = {
    pending: "该问题尚未确认，等待测试人员确认后开始处理",
    waiting: "暂时无法确认问题，需要报告人提供更多信息",
    confirmed: "已确认存在该问题，准备分配给开发人员处理",
    suspending: "已确认存在该问题，暂时搁置等待后期分配",
    processing: "开发人员已知晓，正在处理",
    processed: "开发人员已初步解决该问题，等待测试并发布程序",
    deploying: "测试显示该问题已修复，即将发布到正式服务器",
    resolved: "程序问题已修复，等待报告人确认后将归档该工单",
    archived: "问题已全部处理完毕，无需再做任何操作",
    closed: "问题无效或重复，不作处理"
  }
  return tooltipTexts[props.state]
})

const css_class = computed(() => props.options.class)
</script>

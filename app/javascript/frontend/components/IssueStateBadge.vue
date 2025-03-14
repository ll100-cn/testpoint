<template>
  <Tooltip v-if="state">
    <TooltipTrigger as-child>
      <Badge shape="pill" class="" :style="{ backgroundColor: info.color }">
        <i class="me-1" :class="info.icon"></i>{{ text ?? ISSUE_STATE_MAPPING[props.state] }}
      </Badge>
    </TooltipTrigger>
    <TooltipContent>
      {{ info.tips }}
    </TooltipContent>
  </Tooltip>

  <span v-else>
    无
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { ISSUE_STATE_MAPPING, ISSUE_STATE_COLORS } from "@/constants"
import { Badge } from "$ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "$ui/tooltip"

const props = defineProps<{
  state: string
  text?: string
}>()

interface Info {
  tips: string
  icon: string
  color: string
}

const info_mapping = <Record<string, Info>>{
  pending: {
    tips: "该问题尚未确认，等待测试人员确认后开始处理",
    icon: "far fa-circle",
    color: "rgb(178,42,55)"
  },
  waiting: {
    tips: "暂时无法确认问题，需要报告人提供更多信息",
    icon: "far fa-redo",
    color: "#6f42c1"
  },
  confirmed: {
    tips: "已确认存在该问题，准备分配给开发人员处理",
    icon: "far fa-plus-circle",
    color: ISSUE_STATE_COLORS.confirmed
  },
  suspending: {
    tips: "已确认存在该问题，暂时搁置等待后期分配",
    icon: "far fa-parking-circle",
    color: "rgba(178,42,55,0.7)"
  },
  processing: {
    tips: "开发人员已知晓，正在处理",
    icon: "far fa-arrow-alt-circle-right fa-fade",
    color: "rgba(8,78,181,0.7)"
  },
  processed: {
    tips: "开发人员已初步解决该问题，等待测试并发布程序",
    icon: "far fa-check-circle",
    color: ISSUE_STATE_COLORS.processed
  },
  deploying: {
    tips: "测试显示该问题已修复，即将发布到正式服务器",
    icon: "far fa-sync fa-spin",
    color: "rgba(20,112,70,0.7)"
  },
  resolved: {
    tips: "程序问题已修复，等待报告人确认后将归档该工单",
    icon: "far fa-box-check",
    color: ISSUE_STATE_COLORS.resolved
  },
  closed: {
    tips: "问题无效或重复，不作处理",
    icon: "far fa-do-not-enter",
    color: "#6c757d"
  },
  archived: {
    tips: "该工单已归档，不再处理",
    icon: "far fa-archive",
    color: "rgb(20,90,112)",
  }
}

const info = computed(() => {
  return info_mapping[props.state] ?? info_mapping.pending
})
</script>

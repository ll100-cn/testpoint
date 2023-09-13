export const DATE_FORMAT = 'YYYY-MM-DD HH:mm'
export const DATE_SHORT_FORMAT = 'MM[月]DD[日] HH:mm'
export const DATE_LONG_FORMAT = 'YYYY[年]MM[月]DD[日] HH:mm'
export const ISSUE_STATE_MAPPING = {
  pending: "待确认",
  waiting: "等待反馈",
  confirmed: "已确认",
  processing: "处理中",
  processed: "已处理",
  deploying: "待部署",
  resolved: "已解决",
  closed: "已关闭",
}
export const ISSUE_PRIORITY_OPTIONS = [
  { label: "低优先级", value: "low" },
  { label: "普通", value: "normal" },
  { label: "重要", value: "important" },
]

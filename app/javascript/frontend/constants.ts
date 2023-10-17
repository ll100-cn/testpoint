import _ from "lodash"

export const DATE_FORMAT = 'YYYY-MM-DD'

export const DATETIME_SHORT_FORMAT = 'MM[月]DD[日] HH:mm'
export const DATETIME_LONG_FORMAT = 'YYYY[年]MM[月]DD[日] HH:mm'

export const TASK_UPSHOT_STATES = {
  pending: "待测试",
  pass: "通过",
  failure: "不通过",
}

export const ISSUE_STATE_MAPPING = {
  pending: "待确认",
  waiting: "等待反馈",
  confirmed: "已确认",
  suspending: "已搁置",
  processing: "处理中",
  processed: "已处理",
  deploying: "待部署",
  resolved: "已解决",
  closed: "已关闭",
}

export const OPTIONS_FOR_ISSUE_STATE = _.map(ISSUE_STATE_MAPPING, (value, key) => {
  return { label: value, value: key }
})

export const ISSUE_PRIORITY_OPTIONS = [
  { label: "低优先级", value: "low" },
  { label: "普通", value: "normal" },
  { label: "重要", value: "important" },
]

export const ENUM_ISSUE_STAGES = {
  pending: '分配',
  developing: '开发',
  testing: '测试',
  deploying: '部署',
  resolved: '解决',
  closed: '已关闭',
  archived: '已归档',
}
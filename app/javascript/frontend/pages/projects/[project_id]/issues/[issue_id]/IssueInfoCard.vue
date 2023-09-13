<template>
  <div v-if="issue_info.state == 'pending'" class="alert alert-danger d-flex">
    该工单需要提供更多信息，请按照模版
    <a role="button" class="alert-link ms-1" @click="issue_info_edit_modal.show()">补充工单</a>
    <span v-if="issue_info.remark">，备注：{{ issue_info.remark }}</span>
    <div class="dropdown float-right dropdown-no-arrow ms-auto">
      <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
        <i class="far fa-ellipsis-h" aria-hidden="true" />
      </button>
      <div class="dropdown-menu dropdown-menu-end" style="min-width: 3px;">
        <a class="small dropdown-item" @click="destoryIssueInfo">
          取消该模版
        </a>
      </div>
    </div>
  </div>
  <div v-else class="card mb-3">
    <div class="card-header d-flex align-items-center">
      工单模版：{{ issue_template.name }}
      <span class="ms-3 small text-muted">修改于 {{ utils.humanize(issue_info.updated_at, DATE_LONG_FORMAT) }}</span>
      <div class="dropdown ms-auto dropdown-no-arrow">
        <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
          <i class="far fa-ellipsis-h" aria-hidden="true" />
        </button>
        <div class="dropdown-menu dropdown-menu-end" style="min-width: 3px;">
          <a class="small dropdown-item" @click="issue_info_edit_modal.show()">
            修改
          </a>
          <a class="small dropdown-item" @click="destoryIssueInfo">
            删除该模版
          </a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="no-margin-bottom">
        <template v-for="input in issue_template.inputs" :key="input">
          <p>{{ input.label }}: {{ issue_info.values[input.id] }}</p>
        </template>
      </div>
    </div>
    <div v-if="issue_info.remark" class="card-footer">
      备注：{{ issue_info.remark }}
    </div>
  </div>
  <IssueInfoEditModal ref="issue_info_edit_modal" :issue="issue" :issue_info="issue_info" @update-issue-info="$emit('updateIssueInfo', $event)" />
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { DATE_LONG_FORMAT } from '@/constants'
import * as utils from "@/lib/utils"
import { Issue, IssueInfo } from "@/models"
import * as requests from "@/requests"

import IssueInfoEditModal from "./IssueInfoEditModal.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue_info: IssueInfo
  issue: Issue
}>()

const emits = defineEmits<{
  destoryIssueInfo: [issue_info: IssueInfo]
  updateIssueInfo: [issue_info: IssueInfo]
}>()

const issue_info_edit_modal = ref<InstanceType<typeof IssueInfoEditModal>>()

const issue_template = ref(await new requests.IssueTemplateShow().setup(proxy, (req) => {
  req.interpolations.project_id = props.issue.project_id
  req.interpolations.issue_template_id = props.issue_info.template_id
}).perform())

async function destoryIssueInfo() {
  const issue_info = await new requests.IssueInfoDestroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.issue_info_id = props.issue_info.id
  }).perform()
  if (issue_info) {
    emits('destoryIssueInfo', issue_info)
  }
}
</script>

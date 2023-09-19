<template>
  <div class="card">
    <div class="card-body">
      <h6 class="card-title">提供更多信息</h6>
      <div class="d-flex x-actions">
        <button class="btn btn-sm btn-primary" data-bs-toggle="collapse" data-bs-target="#newComment">
          <i class="far fa-comment fa-fw" /> 新增评论
        </button>
        <button class="btn btn-sm btn-primary" @click="issue_relationship_modal.show()">
          <i class="far fa-link fa-fw" /> 关联其它问题
        </button>
        <button class="btn btn-sm btn-primary" @click="issue_survey_create_modal.show()">
          <i class="far fa-file-lines fa-fw" /> 新增问题模版
        </button>

        <template v-if="issue.state == 'resolved' && !issue.archived_at">
          <div class="btn-group ms-auto" role="group">
            <button class="btn btn-sm btn-outline-success" @click="archiveIssue"><i class="far fa-check me-1" />已解决</button>
            <button class="btn btn-sm btn-outline-danger" @click="issue_unresolve_modal.show()"><i class="far fa-times me-1" />未解决</button>
          </div>
        </template>
        <template v-if="issue.state == 'closed' && !issue.archived_at">
          <div class="btn-group ms-auto" role="group">
            <button class="btn btn-sm btn-outline-success" @click="archiveIssue"><i class="far fa-check me-1" />确认关闭</button>
          </div>
        </template>
      </div>

      <div id="newComment" class="collapse mt-3">
        <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
          <IssueCommentForm />

          <hr class="x-form-divider-through">

          <layouts.group control_wrap_class="x-actions x-spacer-2">
            <layouts.submit>新增评论</layouts.submit>
          </layouts.group>
        </layouts.form_vertical>
      </div>
    </div>
    <IssueRelationshipModal ref="issue_relationship_modal" :issue="issue" @add-relationship="emits('addRelationship', $event)" />
    <IssueSurveyCreateModal ref="issue_survey_create_modal" :issue="issue" @add-issue-info="emits('addIssueSurvey', $event)" />
    <IssueUnresolveModal ref="issue_unresolve_modal" :issue="issue" @update-issue="emits('updateIssue', $event)" />
  </div>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as requests from '@/lib/requests'
import { Comment, Issue, IssueSurvey, IssueRelationship } from "@/models"
import { Collapse } from "bootstrap"
import _ from "lodash"
import { getCurrentInstance, nextTick, ref } from "vue"
import IssueCommentForm from "./IssueCommentForm.vue"
import IssueSurveyCreateModal from "./IssueSurveyCreateModal.vue"
import IssueRelationshipModal from "./IssueRelationshipModal.vue"
import IssueUnresolveModal from "./IssueUnresolveModal.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
}>()
const emits = defineEmits<{
  addRelationship: [issue_relationship: IssueRelationship]
  addIssueSurvey: [issue_survey: IssueSurvey]
  addComment: [comment: Comment]
  updateIssue: [issue: Issue]
}>()

const issue_relationship_modal = ref<InstanceType<typeof IssueRelationshipModal>>()
const issue_survey_create_modal = ref<InstanceType<typeof IssueSurveyCreateModal>>()
const issue_unresolve_modal = ref<InstanceType<typeof IssueUnresolveModal>>()

const former = Former.build({
  content: "",
  attachment_ids: []
})

former.perform = async function() {
  const comment = await new requests.IssueCommentReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform(this.form)

  resetForm()
  emits("addComment", comment)
  hideNewComment()
}

const _form = _.cloneDeep(former.form)
function resetForm() {
  former.form = _form
}

async function hideNewComment() {
  nextTick(() => {
    Collapse.getOrCreateInstance(document.getElementById("newComment")).hide()
  })
}

async function archiveIssue() {
  if (!confirm("确认后将归档该问题, 无法编辑, 是否确认问题已解决？")) {
    return
  }

  const issue = await new requests.IssueArchive().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform()

  if (issue) {
    emits("updateIssue", issue)
  }
}
</script>

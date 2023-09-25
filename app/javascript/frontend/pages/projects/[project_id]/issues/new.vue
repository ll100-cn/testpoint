<template>
  <div class="page-header">
    <h2>新增问题</h2>
  </div>

  <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields v-bind="{ former }" :members="members" :issue_templates="issue_templates" :current_issue_template="current_issue_template" @attachment-change="onAttachmentChange" />

        <template v-if="current_issue_template">
          <hr class="x-form-divider-through">

          <layouts.group control_wrap_class="x-actions x-spacer-2">
            <layouts.submit>新增问题</layouts.submit>
            <router-link class="btn btn-secondary" :to="`/projects/${params.project_id}/issues`">取消</router-link>
          </layouts.group>
        </template>
      </div>
    </div>
  </layouts.form_vertical>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as q from '@/lib/requests'
import { Attachment } from "@/models"
import { usePageStore } from "@/store"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import Fields from "./Fields.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const issue_template_id = route.query.issue_template_id ?? ""
const page = usePageStore()

const members = ref(await page.inProject().request(q.project.MemberReq.List).setup(proxy).perform())

const issue_templates = ref(await new q.project.IssueTemplateReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = params.project_id
}).perform())

const current_issue_template = ref(_.find(issue_templates.value, { id: _.toNumber(issue_template_id) }))

function build_inputs_attributes() {
  return _.map(current_issue_template.value?.inputs, (input, index) => {
    return { template_input_id: input.id, value: "" }
  })
}

const former = Former.build({
  issue_template_id,
  issue_attributes: {
    content: current_issue_template.value?.content_suggestion,
    title: current_issue_template.value?.title_suggestion,
    attachments_params: []
  },
  info_attributes: { inputs_attributes: build_inputs_attributes() },
  attachment_ids: []
})

former.perform = async function() {
  const issue = await new q.bug.IssueReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
  }).perform(this.form)

  router.push(`/projects/${params.project_id}/issues/${issue.id}`)
}

function onAttachmentChange(attachments: Attachment[]) {
  former.form.attachment_ids = _.map(attachments, 'id')
}

</script>

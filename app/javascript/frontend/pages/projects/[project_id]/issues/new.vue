<template>
  <div class="page-header">
    <h2>新增问题</h2>
  </div>

  <form class="container">
    <Form
      :form="form"
      :validations="validations"
      :members="members"
      :issue_templates="issue_templates"
      :current_issue_template="current_issue_template"
      @attachment-change="onAttachmentChange" />
    <template v-if="current_issue_template">
      <hr>
      <div class="x-actions">
        <SubmitButton submit_text="新增问题" :func="onSubmit" />
        <router-link class="btn btn-secondary" :to="`/projects/${params.project_id}/issues`">取消</router-link>
      </div>
    </template>
  </form>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import { Validations } from "@/components/simple_form"
import * as requests from "@/requests"
import _ from "lodash"
import * as utils from "@/lib/utils"

import SubmitButton from "@/components/SubmitButton.vue"
import Form from "./Form.vue"
import { Attachment } from "@/models"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const issue_template_id = route.query.issue_template_id ?? ""

const members = ref(await new requests.MemberList().setup(proxy, (req) => {
  req.interpolations.project_id = params.project_id
}).perform())

const issue_templates = ref(await new requests.IssueTemplateList().setup(proxy, (req) => {
  req.interpolations.project_id = params.project_id
}).perform())

const account = ref(await new requests.AccountGet().setup(proxy).perform())
const current_issue_template = ref(_.find(issue_templates.value, { id: _.toNumber(issue_template_id) }))
const validations = ref(new Validations())
const form = ref({
  issue_template_id,
  issue_attributes: {
    creator_id: _.find(members.value, { user_id: account.value.id })?.id ?? _.first(members.value).id,
    content: current_issue_template.value?.content_suggestion,
    title: current_issue_template.value?.title_suggestion
  },
  info_attributes: { inputs_attributes: build_inputs_attributes() },
  attachment_ids: []
})

function build_inputs_attributes() {
  return _.map(current_issue_template.value?.inputs, (input, index) => {
    return { template_input_id: input.id, value: "" }
  })
}

async function onSubmit() {
  validations.value.clear()

  console.log(form.value)
  try {
    const issue = await new requests.IssueCreate().setup(proxy, (req) => {
      req.interpolations.project_id = params.project_id
    }).perform(form.value)

    if (issue) {
      utils.redirect(`projects/${params.project_id}/issues/${issue.id}`)
      // router.push(`/projects/${params.project_id}/issues/${issue.id}`)
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}

function onAttachmentChange(attachments: Attachment[]) {
  form.value.attachment_ids = _.map(attachments, 'id')
}

</script>

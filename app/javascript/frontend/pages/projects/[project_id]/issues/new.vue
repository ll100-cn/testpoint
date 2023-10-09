<template>
  <div class="page-header">
    <h2>新增问题</h2>
  </div>

  <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <FormErrorAlert />

        <div class="row gy-3">
          <layouts.group code="issue_template_id" label="选择问题模版">
            <controls.bootstrap_select :collection="issue_templates" v-bind="{ labelMethod: 'name', valueMethod: 'id' }" include_blank />
          </layouts.group>

          <template v-if="issue_template">
            <layouts.group v-if="allow('manage', Issue)" code="issue_attributes.creator_id" label="创建人">
              <controls.bootstrap_select v-bind="{ collection: members, labelMethod: 'name', valueMethod: 'id', live_search: true }" include_blank />
            </layouts.group>
            <layouts.group code="issue_attributes.title" label="标题">
              <controls.string />
            </layouts.group>
            <layouts.group code="issue_attributes.content" label="内容">
              <controls.markdown />
            </layouts.group>
            <layouts.group>
              <AttachmentsUploader @changed="onAttachmentsChanged" :attachments="[]" />
            </layouts.group>
          </template>
        </div>

        <template v-if="issue_template">
          <hr class="x-form-divider-through">

          <div class="row gy-3">
            <layouts.group v-for="(input, index) in issue_template.inputs" :code="`survey_attributes.inputs_attributes.${index}.value`" :key="index" :label="input.label">
              <controls.string />
            </layouts.group>
          </div>

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
import AttachmentsUploader from "@/components/AttachmentsUploader.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { number } from "@/components/simple_form/controls"
import * as q from '@/lib/requests'
import { Attachment, Issue } from "@/models"
import { usePageStore } from "@/store"
import _ from "lodash"
import { computed, getCurrentInstance, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const members = ref(await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform())

const issue_templates = ref(await new q.project.IssueTemplateReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = params.project_id
}).perform())

const issue_template = computed(() => {
  return issue_templates.value.find(it => it.id == former.form.issue_template_id)
})

const former = Former.build({
  issue_template_id: null,
  issue_attributes: {
    content: null,
    title: null,
    attachments_params: [],
    creator_id: null,
  },
  survey_attributes: { inputs_attributes: [] },
})

former.perform = async function() {
  const issue = await new q.bug.IssueReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
  }).perform(this.form)

  router.push(`/projects/${params.project_id}/issues/${issue.id}`)
}

watch(issue_template, function(new_value) {
  former.form.issue_attributes.title ||= new_value?.title_suggestion
  former.form.issue_attributes.content ||= new_value?.content_suggestion
  former.form.survey_attributes.inputs_attributes = (new_value?.inputs ?? []).map(input => {
    return { template_input_id: input.id, value: "" }
  })
})

function onAttachmentsChanged(attachments: Partial<Attachment>[]) {
  former.form.issue_attributes.attachments_params = attachments
}

</script>

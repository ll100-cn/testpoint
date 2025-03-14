<template>
  <PageHeader>
    <PageTitle>新增问题</PageTitle>
  </PageHeader>

  <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="issue_template_id" label="选择问题模版">
          <controls.Selectpicker include_blank>
            <SelectdropItem v-for="item in issue_templates" :value="item.id">
              {{ item.name }}
            </SelectdropItem>
          </controls.Selectpicker>
        </FormGroup>

        <template v-if="issue_template">
          <FormGroup v-if="allow('manage', Issue)" path="issue_attributes.creator_id" label="创建人">
            <controls.Select include-blank>
              <OptionsForMember :collection="members" />
            </controls.Select>
          </FormGroup>
          <FormGroup path="issue_attributes.title" label="标题">
            <controls.String />
          </FormGroup>
          <FormGroup path="issue_attributes.content" label="内容">
            <controls.Markdown />
          </FormGroup>
          <FormGroup label="">
            <AttachmentsUploader @changed="onAttachmentsChanged" :attachments="[]" />
          </FormGroup>
        </template>
      </div>

      <template v-if="issue_template">
        <Separator class="my-4" preset="through" />

        <div class="space-y-3">
          <FormGroup v-for="(input, index) in issue_template.inputs" :path="`survey_attributes.inputs_attributes.${index}.value`" :key="index" :label="input.label">
            <controls.String />
          </FormGroup>
        </div>

        <Separator class="my-4" preset="through" />

        <div class="space-x-3">
          <Button>新增问题</Button>
          <Button variant="secondary" :to="`/projects/${params.project_id}/issues`">取消</Button>
        </div>
      </template>
    </div>
  </Form>
</template>

<script setup lang="ts">
import AttachmentsUploader from "@/components/AttachmentsUploader.vue"
import useRequestList from '@/lib/useRequestList'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import OptionsForMember from "@/components/OptionsForMember.vue"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import * as q from '@/requests'
import { Attachment, Issue } from "@/models"
import { usePageStore, useSessionStore } from "@/store"
import { computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const profile = page.inProject()!.profile
const allow = page.inProject()!.allow
const session = useSessionStore()

const members = reqs.raw(session.request(q.project.members.InfoList, params.project_id)).setup().wait()
const issue_templates = reqs.add(q.project.issue_templates.List).setup(req => {
  req.interpolations.project_id = params.project_id
}).wait()
await reqs.performAll()

const issue_template = computed(() => {
  return issue_templates.value.find(it => it.id == former.form.issue_template_id)
})

const former = Former.build({
  issue_template_id: null,
  issue_attributes: {
    content: null,
    title: null,
    attachments_params: [],
    creator_id: profile.member_id,
  },
  survey_attributes: { inputs_attributes: [] },
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const issue = await reqs.add(q.bug.issues.Create).setup(req => {
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

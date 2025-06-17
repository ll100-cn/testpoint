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
            <SelectdropItem v-for="item in issue_template_boxes" :value="item.issue_template.id">
              {{ item.issue_template.name }}
            </SelectdropItem>
          </controls.Selectpicker>
        </FormGroup>

        <template v-if="issue_template_box">
          <FormGroup v-if="allow('manage', Issue)" path="issue_attributes.creator_id" label="创建人">
            <controls.Select include-blank>
              <OptionsForMember :collection="member_boxes" />
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

      <template v-if="issue_template_box">
        <Separator class="my-4" preset="through" />

        <div class="space-y-3">
          <FormGroup v-for="(input, index) in issue_template_box.issue_template.inputs" :path="`survey_attributes.inputs_attributes.${index}.value`" :key="index" :label="input.label">
            <controls.String />
          </FormGroup>
        </div>

        <Separator class="my-4" preset="through" />

        <div class="space-x-3">
          <Button>新增问题</Button>
          <Button variant="secondary" :to="return_url">取消</Button>
        </div>
      </template>
    </div>
  </Form>
</template>

<script setup lang="ts">
import AttachmentsUploader from "@/components/AttachmentsUploader.vue"
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
import { useQueryLine } from '@/lib/useQueryLine'
import PathHelper from "@/lib/PathHelper"
import OkUrl from '@/lib/ok_url'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const profile = page.inProject()!.profile
const allow = page.inProject()!.allow
const session = useSessionStore()
const path_info = PathHelper.parseCollection(route.path, 'new')
const ok_url = new OkUrl(route)

const return_url = computed(() => ok_url.withDefault(path_info.collection))

const { data: member_boxes } = line.request(q.project.members.List(), (req, it) => {
  req.interpolations.project_id = params.project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: issue_template_boxes } = line.request(q.project.issue_templates.List(), (req, it) => {
  req.interpolations.project_id = params.project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
const issue_template_box = computed(() => {
  return issue_template_boxes.value.find(it => it.issue_template.id == former.form.issue_template_id)
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

const { mutateAsync: create_issue_action } = line.request(q.bug.issues.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const issue_box = await create_issue_action({
    interpolations: { project_id: params.project_id },
    body: former.form,
  })

  router.push(`${path_info.collection}/${issue_box.issue.id}`)
}

watch(issue_template_box, function(new_value) {
  if (new_value) {
    former.form.issue_attributes.title ||= new_value.issue_template.title_suggestion
    former.form.issue_attributes.content ||= new_value.issue_template.content_suggestion
    former.form.survey_attributes.inputs_attributes = (new_value?.issue_template.inputs ?? []).map(input => {
      return { template_input_id: input.id, value: "" }
    })
  }
})

function onAttachmentsChanged(attachments: Partial<Attachment>[]) {
  former.form.issue_attributes.attachments_params = attachments
}

</script>

<template>
  <PageHeader>
    <PageTitle>修改问题</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="title" label="标题"><controls.String /></FormGroup>
        <FormGroup path="category_id" label="分类">
          <controls.Selectpicker>
            <SelectDropdownItemsForCategory :categories="categories" />
          </controls.Selectpicker>
        </FormGroup>
        <FormGroup path="creator_id" label="创建人">
          <controls.Select include-blank>
            <OptionsForMember :collection="member_boxes" />
          </controls.Select>
        </FormGroup>
        <FormGroup path="assignee_id" label="受理人">
          <controls.Select include-blank>
            <OptionsForMember :collection="member_boxes" except_level="reporter" />
          </controls.Select>
        </FormGroup>
      </div>

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>更新问题</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/issues/${issue_id}`">取消</Button>
          <Button variant="destructive" v-if="allow('manage', issue_box)" :to="`/projects/${project_id}/issues/${issue_id}/migrate`"><i class="far fa-exchange-alt me-1" /> 迁移到其它项目</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import BSOption from '@/components/BSOption.vue'
import useRequestList from '@/lib/useRequestList'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import OptionsForMember from '@/components/OptionsForMember.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import * as q from '@/requests'
import { usePageStore, useSessionStore } from '@/store'
import { MemberBox } from '@/models'
import _ from "lodash"
import { useRoute, useRouter } from "vue-router"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'
import SelectDropdownItemsForCategory from '@/components/SelectDropdownItemsForCategory.vue'
import { computed } from 'vue'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const line = useQueryLine()
const params = route.params as any
const project_id = _.toInteger(params.project_id)
const issue_id = _.toInteger(params.issue_id)
const page = usePageStore()
const session = useSessionStore()
const allow = page.inProject()!.allow

const { data: issue_box } = line.request(q.bug.issues.Get, (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_id
  return it.useQuery(req.toQueryConfig())
})
const { data: category_page } = line.request(q.project.categories.List, (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: milestone_page } = line.request(q.project.milestones.List, (req, it) => {
  req.interpolations.project_id = project_id
  req.query = { filter: "available" }
  return it.useQuery(req.toQueryConfig())
})
const { data: member_page } = line.request(q.project.members.InfoList, (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const categories = computed(() => category_page.value.list.map(it => it.category))
const member_boxes = computed(() => member_page.value.list)

  const former = Former.build({
    title: issue_box.value.issue.title,
    category_id: issue_box.value.issue.category_id,
    assignee_id: issue_box.value.issue.assignee_id,
    creator_id: issue_box.value.issue.creator_id,
  })

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const issue_action = await reqs.add(q.bug.issue_actions.Create).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = issue_id
  }).perform(this.form)

  router.push({ path: `/projects/${project_id}/issues/${issue_id}` })
}
</script>

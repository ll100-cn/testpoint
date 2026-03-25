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
          <Button variant="secondary" :to="`${path_info.resource}`">取消</Button>
          <Button variant="destructive" v-if="allow('manage', issue_box.issue)" :to="`${path_info.resource}/migrate`"><i class="far fa-exchange-alt me-1" /> 迁移到其它项目</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import BSOption from '@/components/BSOption.vue'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import OptionsForMember from '@/components/OptionsForMember.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import * as q from '@/requests'
import { usePageStore, useSessionStore } from '@/store'
import { type MemberBox } from '@/models'
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
import PathHelper from '@/lib/PathHelper'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any
const project_id = _.toInteger(params.project_id)
const issue_id = _.toInteger(params.issue_id)
const page = usePageStore()
const session = useSessionStore()
const allow = page.inProject()!.allow
const path_info = PathHelper.parseMember(route.path, 'edit')

const { data: issue_box } = line.request(q.bug.issues.Get(), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_id
  return it.useQuery(req.toQueryConfig())
})
const { data: category_boxes } = line.request(q.project.categories.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: member_boxes } = line.request(q.project.members.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const categories = computed(() => category_boxes.value.map(it => it.category))

  const former = Former.build({
    title: issue_box.value.issue.title,
    category_id: issue_box.value.issue.categoryId,
    assignee_id: issue_box.value.issue.assigneeId,
    creator_id: issue_box.value.issue.creatorId,
  })

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_issue_action_mutation } = line.request(q.bug.issue_actions.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const issue_action = await create_issue_action_mutation({
    interpolations: { project_id, issue_id },
    body: former.form,
  })

  router.push({ path: path_info.resource })
}
</script>

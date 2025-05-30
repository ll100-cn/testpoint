<template>
  <PageHeader>
    <PageTitle>项目迁移</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="target_project_id" label="项目">
          <controls.Select include-blank>
            <OptionsForSelect :collection="member_boxes.map(it => ({ label: it.member.name, value: it.member.id }))" />
          </controls.Select>
        </FormGroup>

        <FormGroup path="target_category_id" label="分类">
          <span class="form-control-plaintext text-muted" v-if="actioner.processing">载入中...</span>
          <controls.Select v-else include-blank>
            <OptionsForCategory :collection="category_boxes.map(it => it.category)" />
          </controls.Select>
        </FormGroup>
      </div>

      <hr class="x-form-divider-through">

      <div class="space-x-3">
        <Button :disabled="actioner.processing">迁移</Button>
        <Button variant="secondary" :to="`/projects/${project_id}/issues/${issue_id}/edit`">取消</Button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Actioner } from "@/components/Actioner"
import useRequestList from '@/lib/useRequestList'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import OptionsForCategory from "@/components/OptionsForCategory.vue"
import OptionsForSelect from "@/components/OptionsForSelect.vue"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import * as q from '@/requests'
import { Category, CategoryBox, CategoryPage, IssueBox, MemberBox, MemberPage } from "@/models"
import { usePageStore, useSessionStore } from "@/store"
import _ from "lodash"
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const session = useSessionStore()

const project_id = _.toNumber(params.project_id)
const issue_id = _.toNumber(params.issue_id)

const issue_box = reqs.add(q.bug.issues.Get).setup(req => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_id
}).wait()
const member_page = ref(null! as MemberPage<MemberBox>)
const category_page = ref(null! as CategoryPage<CategoryBox>)
await reqs.performAll()

const former = Former.build({
  target_project_id: null,
  target_category_id: null
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  await reqs.add(q.bug.issue_migrations.Create).setup(req => {
    req.interpolations.project_id = project_id
  }).perform({ ...former.form, source_issue_id: issue_id })

  router.push({ path: `/projects/${former.form.target_project_id}/issues/${issue_id}` })
}

async function onProjectChange() {
  member_page.value = await reqs.raw(session.request(q.project.members.InfoList, project_id)).setup(req => {
    req.interpolations.project_id = project_id
  }).perform()
  category_page.value = await reqs.raw(session.request(q.project.categories.List, project_id)).setup(req => {
    req.interpolations.project_id = project_id
  }).perform()
}

const member_boxes = computed(() => member_page.value.list)
const category_boxes = computed(() => category_page.value.list)

const actioner = Actioner.build<{
  loadCategories: (project_id: number) => void
}>()

actioner.loadCategories = function(project_id: number) {
  this.perform(async function() {
    category_page.value = await reqs.add(q.project.categories.List, project_id).setup(req => {
      req.interpolations.project_id = project_id
    }).perform()

    former.form.target_category_id = null
  }, { confirm_text: false })
}

watch(computed(() => former.form.target_project_id), function(new_value) {
  if (new_value == null) {
    category_page.value.list = []
    former.form.target_category_id = null
  } else {
    actioner.loadCategories(new_value)
  }
})
</script>

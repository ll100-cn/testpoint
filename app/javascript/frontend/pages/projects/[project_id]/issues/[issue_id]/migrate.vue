<template>
  <PageHeader>
    <PageTitle>项目迁移</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="target_project_id" label="项目">
          <controls.select include_blank>
            <OptionsForSelect :collection="projects.map(it => ({ label: it.name, value: it.id }))" />
          </controls.select>
        </FormGroup>

        <FormGroup path="target_category_id" label="分类">
          <span class="form-control-plaintext text-muted" v-if="actioner.processing">载入中...</span>
          <controls.select v-else include_blank>
            <OptionsForCategory :collection="categories" />
          </controls.select>
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
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import OptionsForCategory from "@/components/OptionsForCategory.vue"
import OptionsForSelect from "@/components/OptionsForSelect.vue"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { layouts } from "@/components/simple_form"
import * as q from '@/lib/requests'
import { Category } from "@/models"
import { usePageStore } from "@/store"
import _ from "lodash"
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()

const project_id = _.toNumber(params.project_id)
const issue_id = _.toNumber(params.issue_id)

const issue = ref(await new q.bug.IssueReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_id
}).perform())

const former = Former.build({
  target_project_id: null,
  target_category_id: null
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.bug.IssueMigrationReq().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform({ ...this.form, source_issue_id: issue_id })

  router.push({ path: `/projects/${former.form.target_project_id}/issues/${issue_id}` })
}

const member_infos = ref(await page.singleton(q.profile.MemberInfoReq.List).setup(proxy).perform())
const projects = computed(() => member_infos.value.filter(it => {
  return ['manager', 'owner'].includes(it.role) && it.project_id != project_id
}).map(it => it.project))
const categories = ref([] as Category[])

const actioner = Actioner.build<{
  loadCategories: (project_id: number) => void
}>()

actioner.loadCategories = function(project_id: number) {
  this.perform(async function() {
    categories.value = await new q.project.CategoryReq.List().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
    }).perform()
    former.form.target_category_id = null
  }, { confirm_text: false })
}

watch(computed(() => former.form.target_project_id), function(new_value) {
  if (new_value == null) {
    categories.value = []
    former.form.target_category_id = null
  } else {
    actioner.loadCategories(new_value)
  }
})
</script>

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
            <OptionsForSelect :collection="target_projects.map(it => ({ label: it.name!, value: it.id }))" />
          </controls.Select>
        </FormGroup>

        <FormGroup path="target_category_id" label="分类">
          <span class="form-control-plaintext text-muted" v-if="isLoading">载入中...</span>
          <controls.Select v-else include-blank>
            <OptionsForCategory :collection="target_category_boxes?.map(it => it.category) ?? []" />
          </controls.Select>
        </FormGroup>
      </div>

      <hr class="x-form-divider-through">

      <div class="space-x-3">
        <Button :disabled="isLoading">迁移</Button>
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
import * as q from '@/requests'
import { Category, CategoryBox, CategoryPage, IssueBox, MemberBox, MemberPage } from "@/models"
import { usePageStore, useSessionStore } from "@/store"
import _ from "lodash"
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const session = useSessionStore()

const project_id = _.toNumber(params.project_id)
const issue_id = _.toNumber(params.issue_id)

const former = Former.build({
  target_project_id: null as number | null,
  target_category_id: null
})
const target_project_id = computed(() => former.form.target_project_id)

const { data: issue_box } = line.request(q.bug.issues.Get, (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_id
  return it.useQuery(req.toQueryConfig())
})

const { data: member_page } = line.request(q.profile.members.InfoList, (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: target_category_boxes, isLoading } = line.request(q.project.categories.List, (req, it) => {
  req.interpolations.project_id = target_project_id
  return it.useQuery({
    ...req.toQueryConfig(),
    enabled: computed(() => !!target_project_id.value),
  })
})
await line.wait()

const target_projects = computed(() => member_page.value.list.map(it => it.project!))

const { mutateAsync: create_issue_migration_action } = line.request(q.bug.issue_migrations.Create, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  await create_issue_migration_action({
    interpolations: { project_id: project_id },
    body: { ...former.form, source_issue_id: issue_id }
  })

  router.push({ path: `/projects/${former.form.target_project_id}/issues/${issue_id}` })
}

watch(computed(() => former.form.target_project_id), function(new_value) {
  former.form.target_category_id = null
})
</script>

<template>
  <div class="page-header">
    <h2>项目迁移</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <FormErrorAlert />

        <div class="row gy-3">
          <layouts.group code="target_project_id" label="项目">
            <controls.select include_blank>
              <OptionsForSelect :collection="projects.map(it => ({ label: it.name, value: it.id }))" />
            </controls.select>
          </layouts.group>

          <layouts.group code="target_category_id" label="分类">
            <span class="form-control-plaintext text-muted" v-if="actioner.processing">载入中...</span>
            <controls.select v-else include_blank>
              <OptionsForCategory :collection="categories" />
            </controls.select>
          </layouts.group>
        </div>

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit :disabled="actioner.processing">迁移</layouts.submit>
          <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issues/${issue_id}/edit`">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { Actioner } from "@/components/Actioner"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import OptionsForCategory from "@/components/OptionsForCategory.vue"
import OptionsForSelect from "@/components/OptionsForSelect.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { Category } from "@/models"
import { usePageStore } from "@/store"
import _ from "lodash"
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"

const { proxy } = getCurrentInstance()
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
  target_project_id: undefined,
  target_category_id: undefined
})

former.perform = async function() {
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
    former.form.target_category_id = undefined
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

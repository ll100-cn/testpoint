<template>
  <div class="page-header">
    <h2>项目迁移</h2>
  </div>

  <form>
    <FormErrorAlert :validations="validations" />

    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('project_id')" label="项目">
      <forms.select v-bind="{ ...slotProps, form, collection: project_collection, labelMethod: 'name', valueMethod: 'id' }" @change="getCategories" />
    </layouts.vertical_group>

    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('category_id')" label="分类">
      <forms.select v-bind="{ ...slotProps, form, collection: categories, labelMethod: 'name', valueMethod: 'id', includeBlank: true }" />
    </layouts.vertical_group>

    <layouts.vertical_group>
      <div class="x-actions">
        <SubmitButton submit_text="迁移" :func="issueEdit" />
        <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issues/${issue_id}/edit`">取消</router-link>
      </div>
    </layouts.vertical_group>
  </form>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"

import { Validations, forms, layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import _ from "lodash"

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import SubmitButton from "@/components/SubmitButton.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const project_id = _.toInteger(params.project_id)
const issue_id = _.toInteger(params.issue_id)

const issue = ref(await new requests.IssueReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_id
}).perform())

const validations = ref(new Validations())
const form = ref({
  project_id: issue.value.project_id,
  category_id: undefined
})

const projects = ref(await new requests.ProjectReq.Page().setup(proxy).perform()).value.list

const project_collection = computed(() => {
  return _.filter(projects, { archived: false })
})

const categories = ref(await new requests.CategoryReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = form.value.project_id
}).perform())

async function getCategories() {
  categories.value = await new requests.CategoryReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = form.value.project_id
  }).perform()
  form.value.category_id = undefined
}

async function issueEdit() {
  validations.value.clear()

  try {
    const issue = await new requests.IssueMigrate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.issue_id = issue_id
    }).perform({ targert_project_id: form.value.project_id, category_id: form.value.category_id })

    if (issue) {
      router.push({ path: `/projects/${issue.project_id}/issues/${issue_id}` })
    }
  } catch (error) {
    if (validations.value.handleError(error)) {
      return
    }

    throw error
  }
}

</script>

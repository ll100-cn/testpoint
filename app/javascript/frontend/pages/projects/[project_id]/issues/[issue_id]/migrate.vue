<template>
  <div class="page-header">
    <h2>项目迁移</h2>
  </div>

  <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
    <FormErrorAlert />

    <layouts.group code="project_id" label="项目">
      <forms.select v-bind="{ collection: project_collection, labelMethod: 'name', valueMethod: 'id' }" @change="getCategories" />
    </layouts.group>

    <layouts.group code="category_id" label="分类">
      <forms.select v-bind="{ collection: categories, labelMethod: 'name', valueMethod: 'id', includeBlank: true }" />
    </layouts.group>

    <template #actions>
      <layouts.submit>迁移</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issues/${issue_id}/edit`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"

import { forms, layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import _ from "lodash"

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import FormHorizontal from '@/components/FormHorizontal.vue'
import Former from '@/components/simple_form/Former'

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

const former = Former.build({
  project_id: issue.value.project_id,
  category_id: undefined
})

former.perform = async function() {
  const issue = await new requests.IssueMigrate().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = issue_id
  }).perform({ targert_project_id: former.form.project_id, category_id: former.form.category_id })

  router.push({ path: `/projects/${issue.project_id}/issues/${issue_id}` })
}

const projects = ref(await new requests.ProjectReq.Page().setup(proxy).perform()).value.list

const project_collection = computed(() => {
  return _.filter(projects, { archived: false })
})

const categories = ref(await new requests.CategoryReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = former.form.project_id
}).perform())

async function getCategories() {
  categories.value = await new requests.CategoryReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = former.form.project_id
  }).perform()
  former.form.category_id = undefined
}
</script>

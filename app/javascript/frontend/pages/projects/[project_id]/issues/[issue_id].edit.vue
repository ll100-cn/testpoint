<template>
  <div class="page-header">
    <h2>修改问题</h2>
  </div>

  <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
    <FormErrorAlert />

    <layouts.group code="title" label="标题"><forms.string /></layouts.group>
    <layouts.group code="category_id" label="分类">
      <forms.bootstrap_select v-bind="{ collection: categories, labelMethod: 'name', valueMethod: 'id', live_search: true }" />
    </layouts.group>
    <layouts.group code="creator_id" label="创建人">
      <forms.bootstrap_select v-bind="{ collection: members, labelMethod: 'name', valueMethod: 'id', includeBlank: true, live_search: true }" />
    </layouts.group>
    <layouts.group code="assignee_id" label="受理人">
      <forms.select v-bind="{ collection: assignees_collection, labelMethod: 'name', valueMethod: 'id', includeBlank: true }" />
    </layouts.group>

    <template #actions>
      <layouts.submit>更新问题</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issues/${issue_id}`">取消</router-link>
      <router-link class="btn btn-warning" :to="`/projects/${project_id}/issues/${issue_id}/migrate`"><i class="far fa-exchange-alt me-1" /> 迁移到其它项目</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import FormHorizontal from '@/components/FormHorizontal.vue'
import { forms, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import _ from "lodash"
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"

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
  title: issue.value.title,
  category_id: issue.value.category_id,
  assignee_id: issue.value.assignee_id,
  creator_id: issue.value.creator_id,
})

former.perform = async function() {
  const issue = await new requests.IssueReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = issue_id
  }).perform(this.form)

  router.push({ path: `/projects/${project_id}/issues/${issue_id}` })
}

const categories = ref(await new requests.CategoryReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const members = ref(await new requests.MemberReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const assignees_collection = computed(() => {
  return _(members.value).reject([ 'role', 'reporter' ]).sortBy('developer').groupBy('role_text').value()
})
</script>

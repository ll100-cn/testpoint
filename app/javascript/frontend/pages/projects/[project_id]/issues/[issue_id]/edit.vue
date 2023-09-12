<template>
  <div class="page-header">
    <h2>修改问题</h2>
  </div>

  <form>
    <FormErrorAlert :validations="validations" />

    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('title')" label="标题">
      <forms.string v-bind="{ ...slotProps, form }" />
    </layouts.vertical_group>
    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('category_id')" label="分类">
      <forms.bootstrap_select v-bind="{ ...slotProps, form, collection: categories, labelMethod: 'name', valueMethod: 'id', live_search: true }" />
    </layouts.vertical_group>
    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('creator_id')" label="创建人">
      <forms.bootstrap_select v-bind="{ ...slotProps, form, collection: members, labelMethod: 'name', valueMethod: 'id', includeBlank: true, live_search: true }" />
    </layouts.vertical_group>
    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('assignee_id')" label="受理人">
      <forms.select v-bind="{ ...slotProps, form, collection: assignees_collection, labelMethod: 'name', valueMethod: 'id', includeBlank: true }" />
    </layouts.vertical_group>

    <layouts.vertical_group>
      <div class="x-actions">
        <SubmitButton submit_text="更新问题" :func="issueEdit" />
        <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issues/${issue_id}`">取消</router-link>
        <router-link class="btn btn-warning" :to="`/projects/${project_id}/issues/${issue_id}/migrate`"><i class="far fa-exchange-alt me-1" /> 迁移到其它项目</router-link>
      </div>
    </layouts.vertical_group>
  </form>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"

import { Validations, forms, layouts } from "@/components/simple_form"
import * as requests from "@/requests"
import _ from "lodash"

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import SubmitButton from "@/components/SubmitButton.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const project_id = _.toInteger(params.project_id)
const issue_id = _.toInteger(params.issue_id)

const issue = ref(await new requests.IssueGet().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_id
}).perform())

const validations = ref(new Validations())
const form = ref({
  title: issue.value.title,
  category_id: issue.value.category_id,
  assignee_id: issue.value.assignee_id,
  creator_id: issue.value.creator_id,
})

const categories = ref(await new requests.CategoryList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const members = ref(await new requests.MemberList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const assignees_collection = computed(() => {
  return _(members.value).reject([ 'role', 'reporter' ]).sortBy('developer').groupBy('role_text').value()
})

async function issueEdit() {
  validations.value.clear()

  try {
    const issue = await new requests.IssueUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.issue_id = issue_id
    }).perform(form.value)

    if (issue) {
      router.push({ path: `/projects/${project_id}/issues/${issue_id}` })
    }
  } catch (error) {
    if (validations.value.handleError(error)) {
      return
    }

    throw error
  }
}

</script>

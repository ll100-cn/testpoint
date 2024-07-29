<template>
  <PageHeader>
    <PageTitle>修改问题</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="title" label="标题"><controls.string /></FormGroup>
        <FormGroup path="category_id" label="分类">
          <controls.bootstrap_select>
            <BSOption v-for="category in categories" :value="category.id">
              {{ category.name }}
            </BSOption>
          </controls.bootstrap_select>
        </FormGroup>
        <FormGroup path="creator_id" label="创建人">
          <controls.select include_blank>
            <OptionsForMember :collection="members" />
          </controls.select>
        </FormGroup>
        <FormGroup path="assignee_id" label="受理人">
          <controls.select include_blank>
            <OptionsForMember :collection="members" except_level="reporter" />
          </controls.select>
        </FormGroup>
      </div>

      <hr class="x-form-divider-through">

      <div class="space-x-3">
        <Button>更新问题</Button>
        <Button variant="secondary" :to="`/projects/${project_id}/issues/${issue_id}`">取消</Button>
        <router-link v-if="allow('manage', issue)" class="btn btn-warning me-auto" :to="`/projects/${project_id}/issues/${issue_id}/migrate`"><i class="far fa-exchange-alt me-1" /> 迁移到其它项目</router-link>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import BSOption from '@/components/BSOption.vue'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import OptionsForMember from '@/components/OptionsForMember.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { layouts } from "@/components/simple_form"
import * as q from '@/lib/requests'
import { Issue } from '@/models'
import { usePageStore } from '@/store'
import _ from "lodash"
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const project_id = _.toInteger(params.project_id)
const issue_id = _.toInteger(params.issue_id)
const page = usePageStore()
const allow = page.inProject().allow

const issue = ref(await new q.bug.IssueReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_id
}).perform())

const former = Former.build({
  title: issue.value.title,
  category_id: issue.value.category_id,
  assignee_id: issue.value.assignee_id,
  creator_id: issue.value.creator_id,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const issue_action = await new q.bug.IssueActionReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = issue_id
  }).perform(this.form)

  router.push({ path: `/projects/${project_id}/issues/${issue_id}` })
}

const members = ref(await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform())
const categories = ref(await page.inProject().request(q.project.CategoryReq.List).setup(proxy).perform())
</script>

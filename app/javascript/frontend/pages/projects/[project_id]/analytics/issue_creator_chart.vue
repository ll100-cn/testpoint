<template>
  <PageHeader>
    <PageTitle>统计报表</PageTitle>
  </PageHeader>

  <h3>已创建的工单</h3>

  <div class="mb-3">
    <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform(former.form)">
      <FormGroup path="starts_on" label="">
        <controls.datetime />
      </FormGroup>

      <FormGroup path="ends_on" label="">
        <controls.datetime />
      </FormGroup>

      <FormGroup path="role" label="">
        <controls.select include_blank @change="former.perform(former.form)">
          <option value="owner">负责人</option>
          <option value="manager">管理员</option>
          <option value="developer">开发人员</option>
          <option value="reporter">报告人</option>
        </controls.select>
      </FormGroup>

      <Button class="w-auto">过滤</Button>
    </Form>
  </div>

  <div class="grid grid-cols-3 gap-4">
    <template v-for="member in current_members" :key="member.id">
      <IssueByMemberCard :member="member" :categories="categories" :analytics="analytics" />
    </template>
  </div>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import useRequestList from '@bbb/useRequestList'
import * as utils from "@/lib/utils"
import { usePageStore, useSessionStore } from '@/store'
import _ from 'lodash'
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import IssueByMemberCard from "./IssueByMemberCard.vue"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)
const page = usePageStore()
const session = useSessionStore()

const filter = reactive({
  starts_on: null,
  ends_on: null,
  role: null,
  ...query
})
const project_id = params.project_id

const members = reqs.raw(session.request(q.project.members.InfoList, project_id)).setup().wait()
const categories = reqs.raw(session.request(q.project.categories.List, project_id)).setup().wait()
const analytics = reqs.add(q.project.issue_creator_charts.Get).setup(req => {
  req.query = { ...filter }
}).wait()
await reqs.performAll()

const former = Former.build(filter)

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function(filter) {
  if (filter) {
    router.push({ query: utils.plainToQuery(filter, true) })
  } else {
    router.push({})
  }
}
const current_members = computed(() => {
  return _.filter(members.value, (member) => {
    return member.role == (former.form.role || "reporter")
  })
})
</script>

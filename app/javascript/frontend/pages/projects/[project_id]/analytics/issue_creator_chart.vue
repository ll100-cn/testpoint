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
import * as utils from "@/lib/utils"
import { usePageStore } from '@/store'
import _ from 'lodash'
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import IssueByMemberCard from "./IssueByMemberCard.vue"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)
const page = usePageStore()
const filter = reactive({
  starts_on: null,
  ends_on: null,
  role: null,
  ...query
})
const project_id = params.project_id
const members = ref(await page.inProject()!.request(q.project.MemberInfoReq.List).setup(proxy).perform())
const categories = ref(await page.inProject()!.request(q.project.CategoryReq.List).setup(proxy).perform())
const former = Former.build(filter)
const analytics = ref(await new q.project.IssueCreatorChartReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.plainToQuery(former.form, true)
}).perform())

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function(filter) {
  if (filter) {
    router.push({ query: utils.plainToQuery(filter, true) })
  } else {
    router.push({ query: null })
  }
}
const current_members = computed(() => {
  return _.filter(members.value, (member) => {
    return member.role == (former.form.role || "reporter")
  })
})
</script>

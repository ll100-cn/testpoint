<template>
  <div class="page-header justify-content-between">
    <h2>统计报表</h2>
  </div>

  <h3>已创建的工单</h3>
  <div class="filter-bar mb-3">
    <layouts.form_inline v-bind="{ former }" @submit.prevent="former.submit(former.form)">
      <layouts.group code="starts_on">
        <controls.datetime />
      </layouts.group>
      <layouts.group code="ends_on">
        <controls.datetime />
      </layouts.group>
      <layouts.group code="role">
        <controls.select include_blank @change="former.submit(former.form)">
          <option value="owner">负责人</option>
          <option value="manager">管理员</option>
          <option value="developer">开发人员</option>
          <option value="reporter">报告人</option>
        </controls.select>
      </layouts.group>

      <layouts.submit class="w-auto">过滤</layouts.submit>
    </layouts.form_inline>
  </div>

  <div class="row">
    <template v-for="member in current_members" :key="member.id">
      <IssueByMemberCard :member="member" :categories="categories" :analytics="analytics" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { usePageStore } from '@/store'
import _ from 'lodash'
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import IssueByMemberCard from "./IssueByMemberCard.vue"

const { proxy } = getCurrentInstance()
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
const members = ref(await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform())
const categories = ref(await page.inProject().request(q.project.CategoryReq.List).setup(proxy).perform())
const former = Former.build(filter)
const analytics = ref(await new q.project.IssueCreatorChartReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.plainToQuery(former.form, true)
}).perform())

former.perform = async function(filter) {
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

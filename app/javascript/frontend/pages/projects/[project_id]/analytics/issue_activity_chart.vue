<template>
  <PageHeader>
    <PageTitle>统计报表</PageTitle>
  </PageHeader>

  <h3>工单时间统计</h3>

  <div class="mb-3">
    <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform()">
      <FormGroup path="starts_on" label=""><controls.datetime /></FormGroup>
      <FormGroup path="ends_on" label=""><controls.datetime /></FormGroup>

      <Button class="w-auto">过滤</Button>
    </Form>
  </div>

  <ul class="list-group">
    <template v-for="(wday, index) in 7" :key="index">
      <li class="list-group-item">
        {{ wday_mapping[index] }}
        <WdayIssuesConfirmTimeChart :analytics="analytics" :wday="index" />
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import WdayIssuesConfirmTimeChart from './WdayIssuesConfirmTimeChart.vue'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"

const wday_mapping = [ "星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ]
const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)
const filter = reactive({
  starts_on: null,
  ends_on: null,
  ...query
})
const project_id = params.project_id
const former = Former.build(filter)

const { Form, FormGroup } = FormFactory<typeof former.form>()

const analytics = ref(await new q.project.IssueActivityChartReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.plainToQuery(former.form, true)
}).perform())

former.doPerform = async function() {
  if (filter) {
    router.push({ query: utils.plainToQuery(filter, true) })
  } else {
    router.push({ query: null })
  }
}

</script>

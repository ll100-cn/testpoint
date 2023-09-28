<template>
  <div ref="el" class="modal-dialog modal-lg" role="document">
    <div v-if="!loading" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">新增计划</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
        <div class="modal-body">
          <Fields :platforms="platforms" :test_case_stats="test_case_stats" />
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          <layouts.submit>新增计划</layouts.submit>
        </div>
      </layouts.form_horizontal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { Plan, Platform, TestCaseStat } from '@/models'
import _ from 'lodash'
import { getCurrentInstance, nextTick, ref } from 'vue'
import Fields from "./Fields.vue"
import BootstrapHelper from "@/lib/BootstrapHelper"
import { usePageStore } from "@/store"

const { proxy } = getCurrentInstance()
const el = ref(null as InstanceType<typeof HTMLElement>)
const page = usePageStore()
const profile = page.inProject().profile

const props = defineProps<{
  test_case_stats: TestCaseStat[]
}>()

const emit = defineEmits<{
  created: [plan: Plan]
}>()

const platforms = ref([] as Platform[])

const former = Former.build({
  title: null as string | null,
  platform_id: null as number | null,
  milestone_id: null as number | null,
  role_names: [],
})

former.perform = async function() {
  const plan = await new q.test.PlanReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = profile.project_id
  }).perform(this.form)

  emit('created', plan)
  BootstrapHelper.modal(el).hide()
}

const loading = ref(true)
async function reset() {
  loading.value = true

  platforms.value = await page.inProject().request(q.project.PlatformReq.List).setup(proxy).perform()
  former.form.title = `Test Plan: ${h.datetime(new Date(), "YYYY-MM-DD")}`
  former.form.platform_id = platforms.value[0]?.id
  former.form.milestone_id = null
  former.form.role_names = []

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>

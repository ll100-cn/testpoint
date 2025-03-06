<template>
  <DialogContent v-if="!loading" class="max-w-lg">
    <DialogHeader>
      <DialogTitle>新增计划</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
      <Fields :former="former" :platforms="platforms" :test_case_stats="test_case_stats" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">关闭</Button></DialogClose>
        <Button>新增计划</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { Plan, Platform, TestCaseStat } from '@/models'
import _ from 'lodash'
import { getCurrentInstance, nextTick, ref } from 'vue'
import Fields from "./Fields.vue"
import { usePageStore } from "@/store"
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui'

const proxy = getCurrentInstance()!.proxy as any
const el = ref(null! as InstanceType<typeof HTMLElement>)
const page = usePageStore()
const profile = page.inProject()!.profile
const open = defineModel('open')

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

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const plan = await new q.test.plans.Create().setup(proxy, (req) => {
    req.interpolations.project_id = profile.project_id
  }).perform(this.form)

  emit('created', plan)
  open.value = false
}

const loading = ref(true)
const test_case_stats = ref([] as TestCaseStat[])

async function reset(new_test_case_stats: TestCaseStat[]) {
  loading.value = true

  test_case_stats.value = new_test_case_stats

  platforms.value = await page.inProject().request(q.project.platforms.List).setup(proxy).perform()
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

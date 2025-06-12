<template>
  <DialogContent v-if="!loading" class="max-w-lg">
    <DialogHeader>
      <DialogTitle>新增计划</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
      <Fields :former="former" :platform_boxes="platform_boxes" :test_case_stats="test_case_stats" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">关闭</Button></DialogClose>
        <Button>新增计划</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as h from '@/lib/humanize'
import * as q from '@/requests'
import { Plan, Platform, PlatformBox, PlatformPage, TestCaseStat } from '@/models'
import _ from 'lodash'
import { computed, getCurrentInstance, nextTick, ref } from 'vue'
import Fields from "./Fields.vue"
import { usePageStore } from "@/store"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const el = ref(null! as InstanceType<typeof HTMLElement>)
const page = usePageStore()
const profile = page.inProject()!.profile
const open = defineModel('open')

const emit = defineEmits<{
  created: [plan: Plan]
}>()

const platform_page = ref(null! as PlatformPage<PlatformBox>)
const platform_boxes = computed(() => platform_page.value.list)

const former = Former.build({
  title: null as string | null,
  platform_id: null as number | null,
  milestone_id: null as number | null,
  role_names: [],
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_plan_action } = line.request(q.test.plans.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const plan_box = await create_plan_action({
    interpolations: { project_id: profile.project_id },
    body: former.form
  })

  emit('created', plan_box.plan)
  open.value = false
}

const loading = ref(true)
const test_case_stats = ref([] as TestCaseStat[])

async function reset(new_test_case_stats: TestCaseStat[]) {
  loading.value = true

  test_case_stats.value = new_test_case_stats

  const { data: a_platform_page, suspense } = line.request(q.project.platforms.List(), (req, it) => {
    req.interpolations.project_id = profile.project_id
    return it.useQuery(req.toQueryConfig())
  })
  await suspense()
  platform_page.value = a_platform_page.value

  former.form.title = `Test Plan: ${h.datetime(new Date(), "YYYY-MM-DD")}`
  former.form.platform_id = platform_boxes.value[0]?.platform.id
  former.form.milestone_id = null
  former.form.role_names = []

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>

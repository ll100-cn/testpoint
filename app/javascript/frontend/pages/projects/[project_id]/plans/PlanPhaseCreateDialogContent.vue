<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>{{ plan_info.title }}</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" class="space-y-4">
      <FormErrorAlert />

      <FormGroup path="title" label="标题"><controls.string /></FormGroup>
      <FormGroup path="release_revision" label="版本构建号" hint="*选填，仅用于备注"><controls.string /></FormGroup>

      <Separator preset="standard" />

      <h5 class="text-lg">待测用例</h5>
      <p class="text-muted small"><span class="text-danger">{{ upshots_state_counts['failure'] ?? 0 }}</span> 个失败用例需要重新测试</p>
      <p class="text-muted small"><span class="text-body">{{ upshots_state_counts['pending'] ?? 0 }}</span> 个未测试用例, 将添加到本轮</p>
      <p class="text-muted small"><span class="text-success">{{ upshots_state_counts['pass'] ?? 0 }}</span> 个成功用例将不显示</p>

      <DialogFooter>
        <Button>确定进入下一轮</Button>
        <DialogClose><Button variant="secondary" type="button">返回</Button></DialogClose>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as q from '@/lib/requests'
import { Phase, PhaseInfo, Plan, PlanInfo } from '@/models'
import _ from 'lodash'
import { computed, getCurrentInstance, nextTick, ref } from 'vue'
import { useRoute } from "vue-router"
import { Former, FormFactory, PresenterConfigProvider, Separator } from '$vendor/ui'
import { Button } from '$vendor/ui'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'
import * as controls from '@/components/controls'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const params = route.params as any
const el = ref(null! as HTMLElement)

const props = defineProps<{
  plan_info: PlanInfo
}>()

const emit = defineEmits<{
  created: [ Phase ]
}>()

const upshots_state_counts = computed(() => {
  return _.last(props.plan_info.phase_infos).upshots_state_counts
})

const former = Former.build({
  title: `第 ${props.plan_info.phase_infos.length + 1 ?? 1} 轮`,
  release_revision: ""
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const phase = await new q.test.PlanPhaseReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
    req.interpolations.plan_id = params.plan_id
  }).perform(this.form)

  emit('created', phase)
}

const loading = ref(true)
async function reset() {
  loading.value = true

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>

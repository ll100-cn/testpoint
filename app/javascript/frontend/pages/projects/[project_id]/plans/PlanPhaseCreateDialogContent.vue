<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>{{ plan_box.plan.title }}</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" class="space-y-4">
      <FormErrorAlert />

      <FormGroup path="title" label="标题"><controls.String /></FormGroup>
      <FormGroup path="release_revision" label="版本构建号" hint="*选填，仅用于备注"><controls.String /></FormGroup>

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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { Phase, PhaseInfo, Plan, PlanBox } from '@/models'
import _ from 'lodash'
import { nextTick, ref, computed } from 'vue'
import { useRoute } from "vue-router"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import * as controls from '@/components/controls'
import { useQueryLine } from '@/lib/useQueryLine'

const reqs = useRequestList()
const line = useQueryLine()
const route = useRoute()
const params = route.params as any
const el = ref(null! as HTMLElement)

const props = defineProps<{
  plan_box: PlanBox
}>()

const emit = defineEmits<{
  created: [ Phase ]
}>()

const upshots_state_counts = computed(() => {
  return _.last(props.plan_box.phase_infos)?.upshots_state_counts ?? {}
})

const former = Former.build({
  title: `第 ${(props.plan_box.phase_infos ?? []).length + 1} 轮`,
  release_revision: ""
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_plan_phase_action } = line.request(q.test.plan_phases.Create, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const phase_box = await create_plan_phase_action({
    interpolations: { project_id: params.project_id, plan_id: params.plan_id },
    body: former.form
  })

  emit('created', phase_box.phase)
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

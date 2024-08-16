<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>新增案例</DialogTitle>
      </DialogHeader>
      <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
        <CaseForm :newest_roadmap="newest_roadmap" :platform_repo="platform_repo" :label_repo="label_repo" v-bind="{ former }" />

        <DialogFooter>
          <DialogClose><Button variant="secondary" type="button">Close</Button></DialogClose>
          <Button>保存</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { EntityRepo, Platform, Roadmap, TestCase, TestCaseLabel } from '@/models'
import { type PropType, getCurrentInstance, nextTick, ref } from 'vue'
import CaseForm from './CaseForm.vue'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'

const proxy = getCurrentInstance()!.proxy as any
const open = ref(false)

const props = defineProps<{
  platform_repo: EntityRepo<Platform>,
  label_repo: EntityRepo<TestCaseLabel>,
  newest_roadmap: Roadmap
}>();

const former = Former.build({
  title: null as string | null | undefined,
  content: null as string | null | undefined,
  role_name: null as string | null | undefined,
  scene_name: null as string | null | undefined,
  group_name: null as string | null | undefined,
  platform_ids: [] as number[],
  label_ids: [] as number[],
  storyboard_id : null as number | null,
  requirement_id: null as number | null,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()
const modal = ref<InstanceType<typeof HTMLElement>>()

former.doPerform = async function() {
  const new_test_case = await new q.case.TestCaseReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = project_id.value
  }).perform(this.form)

  emit('create', new_test_case)
  open.value = false
}

const project_id = ref("")

const emit = defineEmits<{(e: 'create', test_case: TestCase): void}>()


function show(current_project_id: string) {
  project_id.value = current_project_id

  nextTick(() => {
    open.value = true
  })
}

defineExpose({
  show
})
</script>

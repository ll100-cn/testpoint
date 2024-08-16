<template>
  <DialogContent class="max-w-4xl" v-if="!loading" :closeable="false">
    <DialogHeader>
      <DialogTitle>{{ test_case.title }}</DialogTitle>

      <template #actions>
        <a v-if="allow('destroy', test_case)" href="#" class="text-destructive text-sm link" @click.prevent="archiveTestCase">归档</a>
      </template>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
      <CaseForm :newest_roadmap="newest_roadmap" :platform_repo="platform_repo" :label_repo="label_repo" v-bind="{ former }" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">Close</Button></DialogClose>
        <Button>保存</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Validations, layouts } from "@/components/simple_form"
import * as q from '@/lib/requests'
import { EntityRepo, Platform, Roadmap, TestCase, TestCaseLabel } from '@/models'
import { usePageStore } from "@/store"
import { Modal } from 'bootstrap'
import $ from 'jquery'
import { getCurrentInstance, nextTick, reactive, ref } from 'vue'
import CaseForm from './CaseForm.vue'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'

const proxy = getCurrentInstance()!.proxy as any
const page = usePageStore()
const allow = page.inProject()!.allow

const validations = reactive<Validations>(new Validations())
const open = defineModel('open')

const props = defineProps<{
  platform_repo: EntityRepo<Platform>,
  label_repo: EntityRepo<TestCaseLabel>,
  newest_roadmap: Roadmap
}>()

const emit = defineEmits<{
  (e: 'updated', test_case: TestCase): void,
  (e: 'destroyed', test_case: TestCase): void,
}>()

const test_case = ref(null! as TestCase)

const former = Former.build({
  title: null,
  content: null,
  role_name: null,
  scene_name: null,
  group_name: null,
  platform_ids: null,
  label_ids: null,
  storyboard_id : null,
  requirement_id: null
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const new_test_case = await new q.case.TestCaseReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = 1
    req.interpolations.id = test_case.value.id
  }).perform(this.form)

  emit('updated', new_test_case)
  open.value = false
}

async function archiveTestCase(event: Event) {
  event.preventDefault()
  validations.clear()

  if (!confirm('确认归档？')) {
    return
  }

  try {
    const new_test_case = await new q.case.TestCaseReq.Destroy().setup(proxy, (req) => {
      req.interpolations.project_id = test_case.value.project_id
      req.interpolations.id = test_case.value.id
    }).perform()

    emit('destroyed', new_test_case)
    open.value = false
  } catch (err) {
    if (validations.handleError(err)) {
      alert(JSON.stringify(validations.fullMessages, null, 2))
      return
    }

    throw err
  }
}

const loading = ref(true)

function reset(a_test_case: TestCase) {
  loading.value = true
  test_case.value = a_test_case

  former.form.title = test_case.value.title
  former.form.content = test_case.value.content
  former.form.role_name = test_case.value.role_name
  former.form.scene_name = test_case.value.scene_name
  former.form.group_name = test_case.value.group_name
  former.form.platform_ids = test_case.value.platform_ids
  former.form.label_ids = test_case.value.label_ids
  former.form.storyboard_id = test_case.value.storyboard_id
  former.form.requirement_id = test_case.value.requirement_id

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>

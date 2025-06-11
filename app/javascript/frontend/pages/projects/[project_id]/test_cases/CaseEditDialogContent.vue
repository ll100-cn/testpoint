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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { EntityRepo, Platform, Roadmap, TestCase, TestCaseLabel } from '@/models'
import { usePageStore } from "@/store"
import $ from 'jquery'
import { getCurrentInstance, nextTick, reactive, ref } from 'vue'
import CaseForm from './CaseForm.vue'
import { Former, GenericForm, GenericFormGroup, Validator } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { useQueryLine } from '@/lib/useQueryLine'

const reqs = useRequestList()
const line = useQueryLine()
const page = usePageStore()
const allow = page.inProject()!.allow

const validations = reactive(new Validator())
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
  title: null as string | null,
  content: null as string | null,
  role_name: null as string | null,
  scene_name: null as string | null,
  group_name: null as string | null,
  platform_ids: null as number[] | null,
  label_ids: null as number[] | null,
  storyboard_id: null as number | null,
  requirement_id: null as number | null,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_test_case_action } = line.request(q.case.test_cases.Update, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: destroy_test_case_action } = line.request(q.case.test_cases.Destroy, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const new_test_case_box = await update_test_case_action({
    interpolations: { project_id: test_case.value.project_id, id: test_case.value.id },
    body: former.form,
  })

  emit('updated', new_test_case_box.test_case)
  open.value = false
}

async function archiveTestCase(event: Event) {
  event.preventDefault()
  validations.clear()

  if (!confirm('确认归档？')) {
    return
  }

  try {
    const test_case_box = await destroy_test_case_action({
      interpolations: { project_id: test_case.value.project_id, id: test_case.value.id }
    })

    emit('destroyed', test_case_box.test_case)
    open.value = false
  } catch (err) {
    validations.processError(err)
    alert(validations.errorMessages([]).join("\n"))
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

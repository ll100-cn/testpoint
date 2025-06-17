<template>
  <DialogContent class="max-w-4xl" v-if="!loading" :closeable="false">
    <DialogHeader>
      <DialogTitle>{{ test_case.title }}</DialogTitle>

      <template #actions>
        <a v-if="allow('destroy', test_case)" href="#" class="text-destructive text-sm link" v-confirm="'确认归档？'" @click.prevent="archiveTestCase">归档</a>
      </template>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
      <CaseForm v-bind="{ former, requirement_boxes, storyboard_boxes, label_repo, platform_repo, newest_roadmap }" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">Close</Button></DialogClose>
        <Button>保存</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup, Validator } from '$ui/simple_form'
import type { TestCaseFrameEmits } from '@/components/TestCaseFrame'
import { useQueryLine } from '@/lib/useQueryLine'
import { EntityRepo, Platform, Roadmap, TestCase, TestCaseLabel } from '@/models'
import * as q from '@/requests'
import { usePageStore } from "@/store"
import $ from 'jquery'
import { computed, getCurrentInstance, nextTick, reactive, ref } from 'vue'
import CaseForm from './CaseForm.vue'
import vConfirm from '@/components/vConfirm'

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

const emit = defineEmits<TestCaseFrameEmits>()

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

const { mutateAsync: update_test_case_action } = line.request(q.case.test_cases.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: destroy_test_case_action } = line.request(q.case.test_cases.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const storyboard_id = computed(() => former.form.storyboard_id)

const { data: requirement_boxes } = line.request(q.project.requirements.List(), (req, it) => {
  req.interpolations.project_id = page.inProject()!.project_id
  req.interpolations.storyboard_id = storyboard_id
  req.query.roadmap_id = props.newest_roadmap.id
  return it.useQuery({
    ...req.toQueryConfig(),
    enabled: computed(() => !!storyboard_id.value)
  })
})

const { data: storyboard_boxes } = line.request(q.project.storyboards.List(), (req, it) => {
  req.interpolations.project_id = page.inProject()!.project_id
  return it.useQuery(req.toQueryConfig())
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

async function reset(a_test_case: TestCase) {
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

  await line.wait()

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>

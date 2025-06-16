<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>新增案例</DialogTitle>
      </DialogHeader>
      <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
        <CaseForm v-bind="{ former, requirement_boxes, storyboard_boxes, label_repo, platform_repo, newest_roadmap }" />

        <DialogFooter>
          <DialogClose><Button variant="secondary" type="button">Close</Button></DialogClose>
          <Button>保存</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { EntityRepo, Platform, RequirementBox, Roadmap, StoryboardBox, TestCase, TestCaseLabel } from '@/models'
import { computed, nextTick, ref, watch } from 'vue'
import CaseForm from './CaseForm.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { useQueryLine } from '@/lib/useQueryLine'
import { usePageStore } from '@/store'

const line = useQueryLine()
const open = ref(false)
const page = usePageStore()

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

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>
const modal = ref<InstanceType<typeof HTMLElement>>()

const { mutateAsync: create_test_case_action } = line.request(q.case.test_cases.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const new_test_case_box = await create_test_case_action({
    interpolations: { project_id: project_id.value },
    body: former.form
  })

  emit('create', new_test_case_box.test_case)
  open.value = false
}

const project_id = ref("")

const emit = defineEmits<{(e: 'create', test_case: TestCase): void}>()

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

watch(storyboard_id, async (new_storyboard_id: number | null) => {
  if (new_storyboard_id) {
    former.form.requirement_id = null
  }
})

async function show(current_project_id: string) {
  project_id.value = current_project_id

  await line.wait()

  nextTick(() => {
    open.value = true
  })
}

defineExpose({
  show
})
</script>

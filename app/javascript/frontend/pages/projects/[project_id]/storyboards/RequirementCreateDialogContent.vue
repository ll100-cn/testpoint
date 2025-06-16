<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>新建需求</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <RequirementForm v-bind="{ former, scenes, platforms, test_case_labels }" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>新增模版化表单</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import type { RequirementFrameEmits } from '@/components/RequirementFrame'
import { useQueryLine } from '@/lib/useQueryLine'
import { EntityRepo, Platform, Requirement, Scene, Storyboard, TestCaseLabel } from '@/models'
import * as q from '@/requests'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import RequirementForm from './RequirementForm.vue'

const route = useRoute()
const params = route.params as any
const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<RequirementFrameEmits>()

const props = defineProps<{
  scenes: Scene[],
  platforms: Platform[],
  test_case_labels: TestCaseLabel[],
  storyboard: Storyboard
}>()

const former = Former.build({
  title: "",
  description: "",
  scene_id: null as number | null,
  platform_ids: [] as number[],
  label_ids: [] as number[],
  label_descriptions: {} as Record<string, string>
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_requirement_action } = line.request(q.project.requirements.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_requirement_box = await create_requirement_action({
    interpolations: { project_id: params.project_id, storyboard_id: props.storyboard.id },
    body: former.form
  })

  emit('created', a_requirement_box.requirement)
  open.value = false
}

const loading = ref(true)
async function reset() {
  loading.value = false
}

defineExpose({
  reset
})
</script>

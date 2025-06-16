<template>
  <DialogContent class="max-w-4xl" :closeable="false">
    <DialogHeader>
      <DialogTitle>编辑需求 #{{ requirement.id }}</DialogTitle>

      <template #actions>
        <Button preset="ghost" variant="destructive" @click.prevent="destroyRequirement">
          删除
        </Button>
      </template>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <RequirementForm v-bind="{ former, scenes, platforms, test_case_labels }" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>编辑模版化表单</Button>
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
import * as utils from '@/lib/utils'
import { EntityRepo, Platform, Requirement, Scene, Storyboard, TestCaseLabel } from '@/models'
import * as q from '@/requests'
import { computed, getCurrentInstance, nextTick, ref } from 'vue'
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

const loading = ref(true)
const requirement = ref(null! as Requirement)
async function reset(a_requirement: Requirement) {
  requirement.value = a_requirement
  former.form.title = a_requirement.title
  former.form.description = a_requirement.description ?? ''
  former.form.scene_id = a_requirement.scene_id
  former.form.platform_ids = a_requirement.platform_ids
  former.form.label_ids = a_requirement.label_ids
  former.form.label_descriptions = a_requirement.label_descriptions

  nextTick(() => {
    loading.value = false
  })
}

const { mutateAsync: destroy_requirement_action } = line.request(q.project.requirements.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: update_requirement_action } = line.request(q.project.requirements.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function destroyRequirement() {
  if (!confirm("确认删除？")) {
    return
  }

  await destroy_requirement_action({
    interpolations: {
      project_id: params.project_id,
      storyboard_id: props.storyboard.id,
      requirement_id: requirement.value.id
    }
  })

  emit('destroyed', requirement.value)
  open.value = false
}

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

former.doPerform = async function() {
  const a_requirement_box = await update_requirement_action({
    interpolations: {
      project_id: params.project_id,
      storyboard_id: props.storyboard.id,
      requirement_id: requirement.value.id
    },
    body: former.form
  })

  emit('updated', a_requirement_box.requirement)
  open.value = false
}

defineExpose({
  reset
})
</script>

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
import * as q from '@/lib/requests'
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement, Scene, Storyboard, TestCaseLabel } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui'
import { computed, getCurrentInstance, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as utils from '@/lib/utils'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import RequirementForm from './RequirementForm.vue'

const route = useRoute()
const params = route.params as any
const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ Requirement ]
  destroyed: [ Requirement ]
}>()

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
  former.form.description = a_requirement.description
  former.form.scene_id = a_requirement.scene_id
  former.form.platform_ids = a_requirement.platform_ids
  former.form.label_ids = a_requirement.label_ids
  former.form.label_descriptions = a_requirement.label_descriptions

  nextTick(() => {
    loading.value = false
  })
}

async function destroyRequirement() {
  if (!confirm("确认删除？")) {
    return
  }

  await new q.project.requirements.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
    req.interpolations.storyboard_id = props.storyboard.id
    req.interpolations.requirement_id = requirement.value.id
  }).perform()

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

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function(a_platforms: Platform[]) {
  const a_requirement = await new q.project.requirements.Update().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
    req.interpolations.storyboard_id = props.storyboard.id
    req.interpolations.requirement_id = requirement.value.id
  }).perform(this.form)
  emit('updated', a_requirement)
  open.value = false
}

defineExpose({
  reset
})
</script>

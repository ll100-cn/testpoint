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
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { EntityRepo, Platform, Requirement, Scene, Storyboard, TestCaseLabel } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import RequirementForm from './RequirementForm.vue'

const route = useRoute()
const params = route.params as any
const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  created: [ Requirement ]
}>()

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

former.doPerform = async function() {
  const a_requirement = await reqs.add(q.project.requirements.Create).setup(req => {
    req.interpolations.project_id = params.project_id
    req.interpolations.storyboard_id = props.storyboard.id
  }).perform(this.form)

  emit('created', a_requirement)
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

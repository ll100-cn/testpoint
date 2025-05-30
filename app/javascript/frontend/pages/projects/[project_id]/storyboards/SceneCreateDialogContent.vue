<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>新建场景</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <FormGroup path="name" label="">
        <controls.String />
      </FormGroup>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>新建场景</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement, Scene, Storyboard, TestCaseLabel } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormErrorAlert from '@/components/FormErrorAlert.vue'

const route = useRoute()
const params = route.params as any
const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  created: [ Scene ]
}>()

const props = defineProps<{
  platforms: Platform[],
  test_case_labels: TestCaseLabel[],
  storyboard: Storyboard
}>()

const former = Former.build({
  name: "",
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const a_scene_box = await reqs.add(q.project.scenes.Create).setup(req => {
    req.interpolations.project_id = params.project_id
    req.interpolations.storyboard_id = params.storyboard_id
  }).perform(this.form)

  emit('created', a_scene_box.scene)
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

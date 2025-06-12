<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>编辑场景</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <FormGroup path="name" label="">
        <controls.String />
      </FormGroup>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>编辑场景</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement, Scene, Storyboard, TestCaseLabel } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const params = route.params as any
const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ Scene ]
}>()

const former = Former.build({
  name: "",
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_scene_action } = line.request(q.project.scenes.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_scene_box = await update_scene_action({
    interpolations: {
      project_id: params.project_id,
      storyboard_id: params.storyboard_id,
      scene_id: scene.value.id
    },
    body: former.form
  })

  emit('updated', a_scene_box.scene)
  open.value = false
}

const loading = ref(true)
const scene = ref(null! as Scene)
async function reset(a_scene: Scene) {
  former.form.name = a_scene.name
  scene.value = a_scene

  loading.value = false
}

defineExpose({
  reset
})
</script>

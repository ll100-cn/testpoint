<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>编辑场景</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <FormGroup path="name" label="">
        <controls.string />
      </FormGroup>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>编辑场景</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import useRequestList from '@bbb/useRequestList'
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement, Scene, Storyboard, TestCaseLabel } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormErrorAlert from '@/components/FormErrorAlert.vue'

const route = useRoute()
const params = route.params as any
const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ Scene ]
}>()

const former = Former.build({
  name: "",
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_scene = await reqs.add(q.project.scenes.Update).setup(req => {
    req.interpolations.project_id = params.project_id
    req.interpolations.storyboard_id = params.storyboard_id
    req.interpolations.scene_id = scene.value.id
  }).perform(this.form)

  emit('updated', a_scene)
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

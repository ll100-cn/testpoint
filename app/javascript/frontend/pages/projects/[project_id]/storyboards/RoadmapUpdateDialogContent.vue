<template>
  <DialogContent class="max-w-4xl" :closeable="false">
    <DialogHeader>
      <DialogTitle>编辑线路图</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="title" label="名称">
          <controls.string />
        </FormGroup>
      </div>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>编辑线路图</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import useRequestList from '@bbb/useRequestList'
import { Former, FormFactory, PresenterConfigProvider } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement, Storyboard, Roadmap } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormErrorAlert from '@/components/FormErrorAlert.vue'

const route = useRoute()
const params = route.params as any
const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ Roadmap ]
}>()

const former = Former.build({
  title: "",
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_roadmap = await reqs.add(q.project.roadmaps.Update).setup(req => {
    req.interpolations.project_id = params.project_id
    req.interpolations.roadmap_id = roadmap.value.id
  }).perform(this.form)

  emit('updated', a_roadmap)
  open.value = false
}

const roadmap = ref(null! as Roadmap)
const loading = ref(true)
async function reset(a_roadmap: Roadmap) {
  former.form.title = a_roadmap.title
  roadmap.value = a_roadmap
  loading.value = false
}

defineExpose({
  reset
})
</script>

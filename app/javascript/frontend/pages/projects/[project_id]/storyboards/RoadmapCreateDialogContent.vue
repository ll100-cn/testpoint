<template>
  <DialogContent class="max-w-4xl" :closeable="false">
    <DialogHeader>
      <DialogTitle>新建线路图</DialogTitle>
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
        <Button>新增线路图</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement, Storyboard, Roadmap } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as utils from '@/lib/utils'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { STORYBOARD_MAIN_AXLE } from '@/constants'

const route = useRoute()
const params = route.params as any
const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')

const emit = defineEmits<{
  created: [ Roadmap ]
}>()

const former = Former.build({
  title: "",
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_roadmap = await new q.project.RoadmapReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
  }).perform(this.form)
  emit('created', a_roadmap)
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
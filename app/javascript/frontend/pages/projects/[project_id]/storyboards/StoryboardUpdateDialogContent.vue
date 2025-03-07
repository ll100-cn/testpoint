<template>
  <DialogContent class="max-w-4xl" :closeable="false">
    <DialogHeader>
      <DialogTitle>修改需求板</DialogTitle>
      <template #actions>
        <Button preset="ghost" variant="destructive" @click.prevent="destroyStoryboard">
          删除
        </Button>
      </template>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="title" label="名称">
          <controls.string />
        </FormGroup>
        <FormGroup path="main_axle" label="主轴">
          <controls.select :options="STORYBOARD_MAIN_AXLE">
            <option v-for="option in STORYBOARD_MAIN_AXLE" :value="option.value">{{ option.label }}</option>
          </controls.select>
        </FormGroup>
        <FormGroup path="description" label="描述">
          <controls.markdown />
        </FormGroup>
      </div>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>修改需求板</Button>
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
import { EntityRepo, Platform, Requirement, Storyboard } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { STORYBOARD_MAIN_AXLE } from '@/constants'

const route = useRoute()
const params = route.params as any
const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ Storyboard ]
  destroyed: [ Storyboard ]
}>()

const former = Former.build({
  title: "",
  description: "",
  main_axle: ''
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_storyboard = await reqs.add(q.project.storyboards.Update).setup(req => {
    req.interpolations.project_id = params.project_id
    req.interpolations.storyboard_id = storyboard.value.id
  }).perform(this.form)

  emit('updated', a_storyboard)
  open.value = false
}

const storyboard = ref(null! as Storyboard)

const loading = ref(true)
async function reset(a_storyboard: Storyboard) {
  storyboard.value = a_storyboard
  former.form.title = a_storyboard.title
  former.form.description = a_storyboard.description ?? ''
  former.form.main_axle = a_storyboard.main_axle

  loading.value = false
}

defineExpose({
  reset
})

async function destroyStoryboard() {
  if (!confirm("确认删除？")) {
    return
  }

  await reqs.add(q.project.storyboards.Destroy).setup(req => {
    req.interpolations.project_id = params.project_id
    req.interpolations.storyboard_id = storyboard.value.id
  }).perform()

  emit('destroyed', storyboard.value)
  open.value = false
}

</script>

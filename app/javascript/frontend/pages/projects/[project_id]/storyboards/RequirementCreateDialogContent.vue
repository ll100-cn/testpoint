<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>选择问题模版</DialogTitle>

      <template #actions>
        <Button preset="ghost" variant="destructive" @click.prevent="">
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
        <FormGroup path="description" label="描述">
          <controls.markdown />
        </FormGroup>

        <FormGroup path="platform_ids" label="平台">
          <controls.checkboxes v-bind="{ name: 'platform_ids[]', collection: platforms, labelMethod: 'name', valueMethod: 'id' }" />
        </FormGroup>
      </div>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>新增模版化表单</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as utils from '@/lib/utils'
import FormErrorAlert from '@/components/FormErrorAlert.vue'

const route = useRoute()
const params = route.params as any
const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')

const emit = defineEmits<{
  created: [ Requirement ]
}>()

const props = defineProps<{
  platforms: Platform[],
  storyboard_id: string
}>()

const former = Former.build({
  title: "",
  description: "",
  platform_ids: [] as number[]
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_issue_survey = await new q.project.RequirementReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
    req.interpolations.storyboard_id = props.storyboard_id
  }).perform(this.form)
  emit('created', a_issue_survey)
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
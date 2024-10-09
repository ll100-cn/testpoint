<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>关联问题</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="target_id" label="关联的问题ID">
          <controls.number />
        </FormGroup>
        <FormGroup path="creator_subscribe_target_issue">
          <controls.checkboxes v-bind="{ collection: [{ label: '使创建人订阅关联的问题', value: true }], labelMethod: 'label', valueMethod: 'value' }" />
        </FormGroup>
      </div>
      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>新增关联问题</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import * as q from '@/requests'
import { IssueInfo } from "@/models"
import { getCurrentInstance, ref } from "vue"
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'

const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ IssueInfo ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const former = Former.build({
  target_id: undefined,
  creator_subscribe_target_issue: true
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_issue_relationship = await new q.bug.IssueRelationshipReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform(former.form)

  props.issue_info.source_relationships.push(a_issue_relationship)
  emit('updated', props.issue_info)

  open.value = false
}

const loading = ref(true)

function reset() {
  loading.value = false
}

defineExpose({ reset })
</script>

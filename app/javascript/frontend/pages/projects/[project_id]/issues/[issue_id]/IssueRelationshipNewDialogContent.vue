<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>关联问题</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="target_id" label="关联的问题ID">
          <controls.Number />
        </FormGroup>
        <FormGroup path="creator_subscribe_target_issue" label="">
          <controls.Boolean>
            使创建人订阅关联的问题
          </controls.Boolean>
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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { Issue, IssueBox } from "@/models"
import { ref } from "vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'

const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [IssueBox]
}>()

const props = defineProps<{
  issue_box: IssueBox
}>()

const former = Former.build({
  target_id: undefined,
  creator_subscribe_target_issue: true
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const a_issue_relationship_box = await reqs.add(q.bug.issue_relationships.Create).setup(req => {
    req.interpolations.project_id = props.issue_box.issue.project_id
    req.interpolations.issue_id = props.issue_box.issue.id
  }).perform(former.form)

  props.issue_box.source_relationships.push(a_issue_relationship_box.issue_relationship)
  emit('updated', props.issue_box)

  open.value = false
}

const loading = ref(true)

function reset() {
  loading.value = false
}

defineExpose({ reset })
</script>

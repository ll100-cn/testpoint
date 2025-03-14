<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>确认问题</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="title" label="标题">
          <controls.String />
        </FormGroup>

        <FormGroup path="category_id" label="分类">
          <controls.Selectpicker>
            <SelectdropItem v-for="category in categories" :value="category.id">
              <i class="fas fa-circle" :style="{ color: category.color }"></i>
              {{ category.name }}
            </SelectdropItem>
          </controls.Selectpicker>
        </FormGroup>

        <FormGroup path="assignee_id" label="受理人">
          <controls.Select include-blank>
            <OptionsForMember :collection="members" except_level="reporter" />
          </controls.Select>
        </FormGroup>
      </div>
      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>确认</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import useRequestList from '@/lib/useRequestList'
import OptionsForMember from "@/components/OptionsForMember.vue"
import * as q from '@/requests'
import { Category, IssueInfo, MemberInfo } from "@/models"
import { useSessionStore } from "@/store"
import { nextTick, ref } from "vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { SelectdropItem } from '@/components/controls/selectdrop'
import { useRoute } from "vue-router"

const reqs = useRequestList()
const open = defineModel('open')
const session = useSessionStore()
const route = useRoute()
const params = route.params as any

const emit = defineEmits<{
  updated: [ IssueInfo ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const former = Former.build({
  title: props.issue_info.title,
  category_id: props.issue_info.category_id,
  assignee_id: props.issue_info.assignee_id,
  state: 'confirmed',
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const a_issue_action = await reqs.add(q.bug.issue_actions.Create).setup(req => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform(this.form)

  Object.assign(props.issue_info, a_issue_action.issue)
  props.issue_info.activities.push(...a_issue_action.activities)
  emit('updated', props.issue_info)
  open.value = false
}

const loading = ref(true)
const members = ref([] as MemberInfo[])
const categories = ref([] as Category[])
async function reset() {
  loading.value = true

  reqs.raw(session.request(q.project.members.InfoList, props.issue_info.project_id)).setup().waitFor(members)
  reqs.add(q.project.categories.List, params.project_id).setup().waitFor(categories)
  await reqs.performAll()

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({
  reset
})

</script>

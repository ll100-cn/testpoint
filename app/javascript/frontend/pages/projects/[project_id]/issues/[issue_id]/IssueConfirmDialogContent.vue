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
            <SelectdropItem v-for="category_box in category_boxes" :value="category_box.category.id">
              <i class="fas fa-circle" :style="{ color: category_box.category.color }"></i>
              {{ category_box.category.name }}
            </SelectdropItem>
          </controls.Selectpicker>
        </FormGroup>

        <FormGroup path="assignee_id" label="受理人">
          <controls.Select include-blank>
            <OptionsForMember :collection="member_boxes" except_level="reporter" />
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
import { Category, Issue, MemberInfo, IssueBox } from "@/models"
import { useSessionStore } from "@/store"
import { nextTick, ref, computed } from "vue"
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
  updated: [IssueBox]
}>()

const props = defineProps<{
  issue_box: IssueBox
}>()

const former = Former.build({
  title: props.issue_box.issue.title,
  category_id: props.issue_box.issue.category_id,
  assignee_id: props.issue_box.issue.assignee_id,
  state: 'confirmed',
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const a_issue_action = await reqs.add(q.bug.issue_actions.Create).setup(req => {
    req.interpolations.project_id = props.issue_box.issue.project_id
    req.interpolations.issue_id = props.issue_box.issue.id
  }).perform(this.form)

  Object.assign(props.issue_box.issue, a_issue_action.issue)
  props.issue_box.activities.push(...a_issue_action.activities)
  emit('updated', props.issue_box)
  open.value = false
}

const loading = ref(true)
const member_page = ref(null! as any)
const category_page = ref(null! as any)

reqs.raw(session.request(q.project.members.InfoList, props.issue_box.issue.project_id)).setup().waitFor(member_page)
reqs.raw(session.request(q.project.categories.List, props.issue_box.issue.project_id)).setup().waitFor(category_page)
await reqs.performAll()

const member_boxes = computed(() => member_page.value.list)
const category_boxes = computed(() => category_page.value.list)

nextTick(() => {
  loading.value = false
})

defineExpose({
  reset
})

</script>

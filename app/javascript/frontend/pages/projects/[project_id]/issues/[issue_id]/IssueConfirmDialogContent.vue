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
import { Button } from '$ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import type { IssueFrameEmits } from '@/components/IssueFrame'
import OptionsForMember from "@/components/OptionsForMember.vue"
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'
import { useQueryLine } from '@/lib/useQueryLine'
import { type CategoryBox, type IssueBox, type MemberBox } from "@/models"
import * as q from '@/requests'
import { nextTick, ref } from "vue"

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<IssueFrameEmits>()

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

const { mutateAsync: create_issue_action_action } = line.request(q.bug.issue_actions.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_issue_action = await create_issue_action_action({
    interpolations: { project_id: props.issue_box.issue.project_id, issue_id: props.issue_box.issue.id },
    body: this.form
  })

  Object.assign(props.issue_box.issue, a_issue_action.issue)
  props.issue_box.activities.push(...a_issue_action.activities)
  emit('updated', props.issue_box)
  open.value = false
}

const loading = ref(true)

const member_boxes = ref([] as MemberBox[])
const category_boxes = ref([] as CategoryBox[])

async function reset() {
  loading.value = true

  const { data: member_boxes_data } = line.request(q.project.members.List(), (req, it) => {
    req.interpolations.project_id = props.issue_box.issue.project_id
    return it.useQuery(req.toQueryConfig())
  })
  const { data: category_boxes_data } = line.request(q.project.categories.List(), (req, it) => {
    req.interpolations.project_id = props.issue_box.issue.project_id
    return it.useQuery(req.toQueryConfig())
  })
  await line.wait()

  member_boxes.value = member_boxes_data.value
  category_boxes.value = category_boxes_data.value

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({
  reset
})
</script>

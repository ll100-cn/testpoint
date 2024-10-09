<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>确认问题</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="title" label="标题">
          <controls.string />
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
          <controls.select include_blank>
            <OptionsForMember :collection="members" except_level="reporter" />
          </controls.select>
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
import BSOption from "@/components/BSOption.vue"
import OptionsForMember from "@/components/OptionsForMember.vue"
import * as q from '@/requests'
import { Category, IssueInfo, MemberInfo } from "@/models"
import { usePageStore } from "@/store"
import { getCurrentInstance, nextTick, ref } from "vue"
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { SelectdropItem } from '@/components/controls/selectdrop'

const page = usePageStore()
const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')

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

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_issue_action = await new q.bug.IssueActionReq.Create().setup(proxy, (req) => {
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

  members.value = await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform()
  categories.value = await page.inProject().request(q.project.CategoryReq.List).setup(proxy).perform()

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({
  reset
})

</script>

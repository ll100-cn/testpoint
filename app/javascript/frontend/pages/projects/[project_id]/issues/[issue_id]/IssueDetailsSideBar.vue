<template>
  <div>
    <FormErrorAlert :validator="former.validator" />

    <div class="flex flex-col gap-y-4">
      <div>
        <div class="text-sm text-muted mb-2">创建时间</div>
        <span>{{ h.datetime(issue_box.issue.created_at) }}</span>
      </div>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_box.issue)" v-bind="{ former, issue_box }" code="state" title="状态">
        <template #editable>
          <FormGroup path="state" label="">
            <controls.Selectpicker>
              <SelectdropItem v-for="item in OPTIONS_FOR_ISSUE_STATE" :value="item.value">
                <IssueStateBadge :state="item.value" />
              </SelectdropItem>
            </controls.Selectpicker>
          </FormGroup>
        </template>

        <IssueStateBadge :state="issue_box.issue.state" />
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_box.issue)" v-bind="{ former, issue_box }" code="priority" title="优先级">
        <template #editable>
          <FormGroup path="priority" label="">
            <controls.Select>
              <OptionsForSelect :collection="ISSUE_PRIORITY_OPTIONS" />
            </controls.Select>
          </FormGroup>
        </template>

        <span :class="{'text-danger': issue_box.issue.priority == 'important'}">{{ issue_box.issue.priority_text }}</span>
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('manage', issue_box.issue)" v-bind="{ former, issue_box }" code="creator_id" title="创建人">
        <template #editable>
          <FormGroup path="creator_id" label="">
            <controls.Select include-blank>
              <OptionsForMember :collection="member_boxes" />
            </controls.Select>
          </FormGroup>
        </template>

        {{ issue_box.issue.creator.name }}
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_box.issue)" v-bind="{ former, issue_box }" code="assignee_id" title="受理人">
        <template #editable>
          <FormGroup path="assignee_id" label="">
            <controls.Select include-blank>
              <OptionsForMember :collection="member_boxes" except_level="reporter" />
            </controls.Select>
          </FormGroup>
        </template>

        {{ issue_box.issue.assignee?.name ?? '无' }}
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_box.issue)" v-bind="{ former, issue_box }" code="category_id" title="分类">
        <template #editable>
          <FormGroup path="category_id" label="">
            <controls.Selectpicker>
              <SelectDropdownItemsForCategory :categories="category_boxes.map(it => it.category)" />
            </controls.Selectpicker>
          </FormGroup>
        </template>

        <CategoryBadgeVue :category="_.find(category_boxes.map(it => it.category), { id: issue_box.issue.category_id })" />
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_box.issue)" v-bind="{ former, issue_box }" code="milestone_id" title="里程碑">
        <template #editable>
          <FormGroup path="milestone_id" label="">
            <controls.Select>
              <OptionsForSelect :collection="milestone_boxes.map(it => ({ label: it.milestone.title, value: it.milestone.id }))" />
            </controls.Select>
          </FormGroup>
        </template>

        {{ _.find(milestone_boxes, { milestone: { id: issue_box.issue.milestone_id } })?.milestone.title ?? '无' }}
      </IssueDetailEdit>

      <hr>

      <div class="flex flex-col" v-if="!readonly">
        <div class="h5">订阅</div>
        <div class="mt-1">
          <Button v-if="_.find(issue_box.subscriptions, it => it.user_id == current_user.id)" preset="outline" variant="secondary" class="w-full" @click="unsubscribe">取消订阅</Button>
          <Button v-else preset="outline" variant="secondary" class="w-full" @click="subscribe">订阅问题</Button>
          <div class="mt-2 text-sm text-muted">{{ issue_box.subscriptions.length }} 人订阅:</div>
          <div class="flex items-center gap-1">
            <Tooltip v-for="subscription in issue_box.subscriptions">
              <TooltipTrigger>
                <img class="rounded-full" :src="subscription.member.avatar_url" width="30">
              </TooltipTrigger>
              <TooltipContent>
                {{ subscription.member.name }}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useRequestList from '@/lib/useRequestList'
import CategoryBadgeVue from "@/components/CategoryBadge.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import OptionsForMember from "@/components/OptionsForMember.vue"
import OptionsForSelect from "@/components/OptionsForSelect.vue"
import { ISSUE_PRIORITY_OPTIONS, OPTIONS_FOR_ISSUE_STATE } from "@/constants"
import * as h from '@/lib/humanize'
import * as q from '@/requests'
import { Issue, IssueBox } from "@/models"
import { usePageStore } from "@/store"
import { useSessionStore } from "@/store/session"
import _ from "lodash"
import { computed, ref } from "vue"
import IssueDetailEdit from "./IssueDetailEdit.vue"
import { Badge } from "$ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "$ui/tooltip"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'
import SelectDropdownItemsForCategory from '@/components/SelectDropdownItemsForCategory.vue'
import { useQueryLine } from '@/lib/useQueryLine'

const reqs = useRequestList()
const line = useQueryLine()
const session = useSessionStore()
const current_user = session.account!.user
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  readonly: boolean
  issue_box: IssueBox
}>()
const emit = defineEmits<{
  updated: [IssueBox]
}>()

const former = Former.build({
  state: props.issue_box.issue.state,
  priority: props.issue_box.issue.priority,
  creator_id: props.issue_box.issue.creator_id,
  assignee_id: props.issue_box.issue.assignee_id,
  category_id: props.issue_box.issue.category_id,
  milestone_id: props.issue_box.issue.milestone_id,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_issue_action_action } = line.request(q.bug.issue_actions.Create, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: create_subscription_action } = line.request(q.bug.subscriptions.Create, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: destroy_subscription_action } = line.request(q.bug.subscriptions.Destroy, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function(code: string) {
  const a_issue_action = await create_issue_action_action({
    interpolations: { project_id: props.issue_box.issue.project_id, issue_id: props.issue_box.issue.id },
    body: { [code]: this.form[code] }
  })

  Object.assign(props.issue_box.issue, a_issue_action.issue)
  props.issue_box.activities.push(...a_issue_action.activities)
  emit('updated', props.issue_box)
}

const { data: member_page } = line.request(q.project.members.InfoList, (req, it) => {
  req.interpolations.project_id = props.issue_box.issue.project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: category_page } = line.request(q.project.categories.List, (req, it) => {
  req.interpolations.project_id = props.issue_box.issue.project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: milestone_page } = line.request(q.project.milestones.List, (req, it) => {
  req.interpolations.project_id = props.issue_box.issue.project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const member_boxes = computed(() => member_page.value.list)
const category_boxes = computed(() => category_page.value.list)
const milestone_boxes = computed(() => milestone_page.value.list)

async function subscribe() {
  const a_subscription = await create_subscription_action({
    interpolations: { project_id: props.issue_box.issue.project_id, issue_id: props.issue_box.issue.id }
  })

  props.issue_box.subscriptions.push(a_subscription)
  emit("updated", props.issue_box)
}

async function unsubscribe() {
  await destroy_subscription_action({
    interpolations: { project_id: props.issue_box.issue.project_id, issue_id: props.issue_box.issue.id, subscription_id: props.issue_box.issue.subscription_id }
  })

  const index = props.issue_box.subscriptions.findIndex(it => it.user_id == current_user.id)
  props.issue_box.subscriptions.splice(index, 1)
  emit("updated", props.issue_box)
}
</script>

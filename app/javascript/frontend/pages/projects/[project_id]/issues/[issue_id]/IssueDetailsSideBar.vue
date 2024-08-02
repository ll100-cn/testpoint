<template>
  <div>
    <FormErrorAlert :validator="former.validator" />

    <div class="flex flex-col gap-y-4">
      <div>
        <div class="text-sm text-muted mb-2">创建时间</div>
        <span>{{ h.datetime(issue_info.created_at) }}</span>
      </div>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="state" title="状态">
        <template #editable>
          <FormGroup path="state" label="">
            <controls.Selectpicker>
              <SelectdropItem v-for="item in OPTIONS_FOR_ISSUE_STATE" :value="item.value">
                <IssueStateBadge :state="item.value" />
              </SelectdropItem>
            </controls.Selectpicker>
          </FormGroup>
        </template>

        <IssueStateBadge :state="issue_info.state" />
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="priority" title="优先级">
        <template #editable>
          <FormGroup path="priority" label="">
            <controls.select>
              <OptionsForSelect :collection="ISSUE_PRIORITY_OPTIONS" />
            </controls.select>
          </FormGroup>
        </template>

        <span :class="{'text-danger': issue_info.priority == 'important'}">{{ issue_info.priority_text }}</span>
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('manage', issue_info)" v-bind="{ former, issue_info }" code="creator_id" title="创建人">
        <template #editable>
          <FormGroup path="creator_id" label="">
            <controls.select include_blank>
              <OptionsForMember :collection="members" />
            </controls.select>
          </FormGroup>
        </template>

        {{ issue_info.creator.name }}
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="assignee_id" title="受理人">
        <template #editable>
          <FormGroup path="assignee_id" label="">
            <controls.select include_blank>
              <OptionsForMember :collection="members" except_level="reporter" />
            </controls.select>
          </FormGroup>
        </template>

        {{ issue_info.assignee?.name ?? '无' }}
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="category_id" title="分类">
        <template #editable>
          <FormGroup path="category_id" label="">
            <controls.Selectpicker>
              <SelectdropItem v-for="category in categories" :value="category.id">
                <i class="fas fa-circle" :style="{ color: category.color }"></i>
                {{ category.name }}
              </SelectdropItem>
            </controls.Selectpicker>
          </FormGroup>
        </template>

        <CategoryBadgeVue :category="_.find(categories, { id: issue_info.category_id })" />
      </IssueDetailEdit>

      <hr>

      <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="milestone_id" title="里程碑">
        <template #editable>
          <FormGroup path="milestone_id" label="">
            <controls.select>
              <OptionsForSelect :collection="milestones.map(it => ({ label: it.title, value: it.id }))" />
            </controls.select>
          </FormGroup>
        </template>

        {{ _.find(milestones, { id: issue_info.milestone_id })?.title ?? '无' }}
      </IssueDetailEdit>

      <hr>

      <div class="flex flex-col" v-if="!readonly">
        <div class="h5">订阅</div>
        <div class="mt-1">
          <Button v-if="_.find(issue_info.subscriptions, it => it.user_id == current_user.id)" preset="outline" variant="secondary" class="w-full" @click="unsubscribe">取消订阅</Button>
          <Button v-else preset="outline" variant="secondary" class="w-full" @click="subscribe">订阅问题</Button>
          <div class="mt-2 text-sm text-muted">{{ issue_info.subscriptions.length }} 人订阅:</div>
          <div class="flex items-center gap-1">
            <TooltipProvider v-for="subscription in issue_info.subscriptions">
              <Tooltip>
                <TooltipTrigger>
                  <img class="rounded-full" :src="subscription.member.avatar_url" width="30">
                </TooltipTrigger>
                <TooltipContent>
                  {{ subscription.member.name }}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BSOption from "@/components/BSOption.vue"
import CategoryBadgeVue from "@/components/CategoryBadge.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import OptionsForMember from "@/components/OptionsForMember.vue"
import OptionsForSelect from "@/components/OptionsForSelect.vue"
import { layouts } from "@/components/simple_form"
import { ISSUE_PRIORITY_OPTIONS, OPTIONS_FOR_ISSUE_STATE } from "@/constants"
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { IssueInfo } from "@/models"
import { usePageStore } from "@/store"
import { useSessionStore } from "@/store/session"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"
import IssueDetailEdit from "./IssueDetailEdit.vue"
import { Badge, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "$vendor/ui";
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'

const proxy = getCurrentInstance()!.proxy as any
const store = useSessionStore()
const current_user = store.account!.user
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  issue_info: IssueInfo
  readonly: boolean
}>()
const emit = defineEmits<{
  updated: [ IssueInfo ]
}>()

const former = Former.build({
  state: props.issue_info.state,
  priority: props.issue_info.priority,
  creator_id: props.issue_info.creator_id,
  assignee_id: props.issue_info.assignee_id,
  category_id: props.issue_info.category_id,
  milestone_id: props.issue_info.milestone_id,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()
former.doPerform = async function(code: string) {
  const a_issue_action = await new q.bug.IssueActionReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform({ [code]: this.form[code] })

  Object.assign(props.issue_info, a_issue_action.issue)
  props.issue_info.activities.push(...a_issue_action.activities)
  emit('updated', props.issue_info)
}

const members = ref(await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform())
const categories = ref(await page.inProject().request(q.project.CategoryReq.List).setup(proxy).perform())
const milestones = ref(await page.inProject().request(q.project.MilestoneReq.List).setup(proxy).perform())

async function subscribe() {
  const a_subscription = await new q.bug.SubscriptionReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform()

  props.issue_info.subscriptions.push(a_subscription)
  emit("updated", props.issue_info)
}

async function unsubscribe() {
  await new q.bug.SubscriptionReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform()

  const index = props.issue_info.subscriptions.findIndex(it => it.user_id == current_user.id)
  props.issue_info.subscriptions.splice(index, 1)
  emit("updated", props.issue_info)
}

</script>

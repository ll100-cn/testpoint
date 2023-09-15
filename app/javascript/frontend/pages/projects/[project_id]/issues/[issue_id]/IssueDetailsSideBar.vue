<template>
  <div class="col-12 col-md-3 order-0 order-md-1">
    <button class="btn btn-secondary btn-block d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#issueDetailCollapse">
      修改问题
    </button>

    <div id="issueDetailCollapse" class="collapse d-md-block">
      <span class="small text-muted mt-2 d-flex">创建时间</span>
      <span>{{ utils.humanize(issue.created_at, DATE_LONG_FORMAT) }}</span>
      <hr>

      <div>
        <FormErrorAlert :validations="former.validations" />

        <IssueDetailEdit v-bind="{ former }" code="state" title="状态">
          <template #editable>
            <layouts.group code="state">
              <controls.select v-bind="{ collection: issue_state_mapping_collection, labelMethod: 'label', valueMethod: 'value' }" />
            </layouts.group>
          </template>

          <IssueStateBadge :state="issue.state" />
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="priority" title="优先级">
          <template #editable>
            <layouts.group code="priority">
              <controls.select v-bind="{ collection: ISSUE_PRIORITY_OPTIONS, labelMethod: 'label', valueMethod: 'value' }" />
            </layouts.group>
          </template>

          <span :class="{'text-danger': issue.priority == 'important'}">{{ issue.priority_text }}</span>
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="creator_id" title="创建人">
          <template #editable>
            <layouts.group code="creator_id">
              <controls.select v-bind="{ collection: creator_collection, labelMethod: 'name', valueMethod: 'id' }" />
            </layouts.group>
          </template>

          {{ issue.creator.name }}
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="assignee_id" title="受理人">
          <template #editable>
            <layouts.group code="assignee_id">
              <controls.select v-bind="{ collection: assignee_collection, labelMethod: 'name', valueMethod: 'id' }" />
            </layouts.group>
          </template>

          {{ issue.assignee?.name ?? '无' }}
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="category_id" title="分类">
          <template #editable>
            <layouts.group code="category_id">
              <controls.bootstrap_select v-bind="{ live_search: true, collection: categories, labelMethod: 'name', valueMethod: 'id' }" />
            </layouts.group>
          </template>

          <CategoryBadgeVue :category="_.find(categories, { id: issue.category_id })" />
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="milestone_id" title="里程碑">
          <template #editable>
            <layouts.group code="milestone_id">
              <controls.select v-bind="{ collection: milestones, labelMethod: 'title', valueMethod: 'id' }" />
            </layouts.group>
          </template>

          {{ _.find(milestones, { id: issue.milestone_id })?.title ?? '无' }}
        </IssueDetailEdit>

        <div class="d-flex flex-column">
          <div class="h5">订阅</div>
          <div class="mt-1">
            <button v-if="_.find(issue.subscribed_users, { id: current_user.id })" class="btn border border-secondary bg-light w-100 text-dark" @click="unsubscribe">取消订阅</button>
            <button v-else class="btn border border-secondary bg-light w-100 text-dark" @click="subscribe">订阅问题</button>
            <div class="mt-2 small text-muted">{{ issue.subscribed_users.length }} 人订阅:</div>
            <div class="x-actions">
              <img v-for="user in issue.subscribed_users" :key="user.id" v-tooltip:top="user.name" class="rounded-circle avatar" :src="user.avatarUrl()" width="30">
            </div>
          </div>
        </div>
      </div>

      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue"

import CategoryBadgeVue from "@/components/CategoryBadge.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import { Validations, controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { DATE_LONG_FORMAT, ISSUE_PRIORITY_OPTIONS, ISSUE_STATE_MAPPING } from "@/constants"
import * as requests from '@/lib/requests'
import * as utils from "@/lib/utils"
import { Issue } from "@/models"
import { useSessionStore } from "@/store/session"
import _ from "lodash"
import IssueDetailEdit from "./IssueDetailEdit.vue"

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const current_user = store.account.user
const props = defineProps<{
  issue: Issue
}>()
const emits = defineEmits<{
  updateIssue: [issue: Issue]
  refreshIssue: []
}>()

const former = Former.build({
  state: props.issue?.state,
  priority: props.issue?.priority,
  creator_id: props.issue?.creator_id,
  assignee_id: props.issue?.assignee_id,
  category_id: props.issue?.category_id,
  milestone_id: props.issue?.milestone_id,
})

former.perform = async function(code: string) {
  const a_issue = await new requests.IssueReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform({ [code]: this.form[code] })

  emits("updateIssue", a_issue)
}

const members = ref(await new requests.MemberReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = props.issue.project_id
}).perform())

const categories = ref(await new requests.CategoryReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = props.issue.project_id
}).perform())

const milestones = await new requests.MilestoneReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = props.issue.project_id
}).perform()

const issue_state_mapping_collection = computed(() => {
  return _.map(ISSUE_STATE_MAPPING, (value, key) => {
    return { label: value, value: key }
  })
})

const creator_collection = computed(() => {
  return _(members.value).sortBy('developer').groupBy('role_text').value()
})

const assignee_collection = computed(() => {
  return _(members.value).reject([ 'role', 'reporter' ]).sortBy('developer').groupBy('role_text').value()
})

async function subscribe() {
  await new requests.SubscriptionReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform()
  emits('refreshIssue')
}

async function unsubscribe() {
  await new requests.SubscriptionReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform()
  emits('refreshIssue')
}

</script>

<template>
  <div class="col-12 col-md-3 order-0 order-md-1">
    <button class="btn btn-secondary btn-block d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#issueDetailCollapse">
      修改问题
    </button>

    <div id="issueDetailCollapse" class="collapse d-md-block">
      <span class="small text-muted mt-2 d-flex">创建时间</span>
      <span>{{ utils.humanize(issue.created_at, DATE_LONG_FORMAT) }}</span>
      <hr>

      <FormErrorAlert :validations="validations" />
      <IssueDetailEdit :issue="issue" :validations="validations" code="state" attribute_name="状态" :form="form" @update-issue="emits('updateIssue', $event)">
        <template #edit="slotProps">
          <layouts.horizontal_group :validation="validations.disconnect(slotProps.code)">
            <forms.select v-bind="{ ...slotProps, custom_class: 'form-select-sm', collection: issue_state_mapping_collection, labelMethod: 'label', valueMethod: 'value' }" />
          </layouts.horizontal_group>
        </template>
        <IssueStateBadge :issue_state="issue.state" />
      </IssueDetailEdit>
      <IssueDetailEdit :issue="issue" :validations="validations" code="priority" attribute_name="优先级" :form="form" @update-issue="emits('updateIssue', $event)">
        <template #edit="slotProps">
          <layouts.horizontal_group :validation="validations.disconnect(slotProps.code)">
            <forms.select v-bind="{ ...slotProps, custom_class: 'form-select-sm', collection: ISSUE_PRIORITY_OPTIONS, labelMethod: 'label', valueMethod: 'value' }" />
          </layouts.horizontal_group>
        </template>
        <span :class="{'text-danger': issue.priority == 'important'}">{{ issue.priority_text }}</span>
      </IssueDetailEdit>
      <IssueDetailEdit :issue="issue" :validations="validations" code="creator_id" attribute_name="创建人" :form="form" @update-issue="emits('updateIssue', $event)">
        <template #edit="slotProps">
          <layouts.horizontal_group :validation="validations.disconnect(slotProps.code)">
            <forms.select v-bind="{ ...slotProps, custom_class: 'form-select-sm', collection: creator_collection, labelMethod: 'name', valueMethod: 'id' }" />
          </layouts.horizontal_group>
        </template>
        {{ issue.creator?.name }}
      </IssueDetailEdit>
      <IssueDetailEdit :issue="issue" :validations="validations" code="assignee_id" attribute_name="受理人" :form="form" @update-issue="emits('updateIssue', $event)">
        <template #edit="slotProps">
          <layouts.horizontal_group :validation="validations.disconnect(slotProps.code)">
            <forms.select v-bind="{ ...slotProps, custom_class: 'form-select-sm', collection: assignee_collection, labelMethod: 'name', valueMethod: 'id' }" />
          </layouts.horizontal_group>
        </template>
        {{ issue.assignee?.name }}
      </IssueDetailEdit>
      <IssueDetailEdit :issue="issue" :validations="validations" code="category_id" attribute_name="分类" :form="form" @update-issue="emits('updateIssue', $event)">
        <template #edit="slotProps">
          <layouts.horizontal_group :validation="validations.disconnect(slotProps.code)">
            <forms.bootstrap_select v-bind="{ ...slotProps, live_search: true, custom_class: 'form-control-sm', collection: categories, labelMethod: 'name', valueMethod: 'id' }" />
          </layouts.horizontal_group>
        </template>
        {{ _.find(categories, { id: issue.category_id })?.name }}
      </IssueDetailEdit>

      <IssueDetailEdit :issue="issue" :validations="validations" code="milestone_id" attribute_name="里程碑" :form="form" @update-issue="emits('updateIssue', $event)">
        <template #edit="slotProps">
          <layouts.horizontal_group :validation="validations.disconnect(slotProps.code)">
            <forms.select v-bind="{ ...slotProps, custom_class: 'form-select-sm', collection: milestones, labelMethod: 'title', valueMethod: 'id' }" />
          </layouts.horizontal_group>
        </template>
        {{ _.find(milestones, { id: issue.milestone_id })?.title }}
      </IssueDetailEdit>

      <div class="d-flex flex-column">
        <div class="h5">订阅</div>
        <div class="mt-1">
          <button v-if="_.find(issue.subscribed_users, { id: current_user.id })" class="btn border border-secondary bg-light w-100 text-dark" @click="unsubscribe">取消订阅</button>
          <button v-else class="btn border border-secondary bg-light w-100 text-dark" @click="subscribe">订阅问题</button>
          <div class="mt-2 small text-muted">{{ issue.subscribed_users.length }} 人订阅:</div>
          <div class="x-actions">
            <img
              v-for="user in issue.subscribed_users"
              :key="user.id"
              v-tooltip:top="user.name"
              class="rounded-circle avatar"
              :src="user.avatar_url" width="30">
          </div>
        </div>
      </div>

      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue"

import { Validations, forms, layouts } from "@/components/simple_form"
import { DATE_LONG_FORMAT, ISSUE_STATE_MAPPING, ISSUE_PRIORITY_OPTIONS } from "@/constants"
import * as utils from "@/lib/utils"
import * as requests from "@/requests"
import { Issue } from "@/models"
import _ from "lodash"
import { useSessionStore } from "@/store"

import IssueStateBadge from "@/components/IssueStateBadge.vue"
import IssueDetailEdit from "./IssueDetailEdit.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const current_user = store.account
const props = defineProps<{
  issue: Issue
}>()
const emits = defineEmits<{
  updateIssue: [issue: Issue]
  refreshIssue: []
}>()

const form = ref({
  state: props.issue?.state,
  priority: props.issue?.priority,
  creator_id: props.issue?.creator_id,
  assignee_id: props.issue?.assignee_id,
  category_id: props.issue?.category_id,
  milestone_id: props.issue?.milestone_id,
})
const validations = ref(new Validations())

const members = ref(await new requests.MemberList().setup(proxy, (req) => {
  req.interpolations.project_id = props.issue.project_id
}).perform())

const categories = ref(await new requests.CategoryList().setup(proxy, (req) => {
  req.interpolations.project_id = props.issue.project_id
}).perform())

const milestones = await new requests.MilestoneList().setup(proxy, (req) => {
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
  await new requests.SubscriptionCreate().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform()
  emits('refreshIssue')
}

async function unsubscribe() {
  await new requests.SubscriptionDestroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform()
  emits('refreshIssue')
}

</script>

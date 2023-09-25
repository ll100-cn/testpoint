<template>
  <div>
    <button class="btn btn-secondary btn-block d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#issueDetailCollapse">
      修改问题
    </button>

    <div id="issueDetailCollapse" class="collapse d-md-block">
      <span class="small text-muted mt-2 d-flex">创建时间</span>
      <span>{{ utils.humanize(issue_info.created_at, DATE_LONG_FORMAT) }}</span>
      <hr>

      <div>
        <FormErrorAlert :validations="former.validations" />

        <IssueDetailEdit v-bind="{ former }" code="state" title="状态">
          <template #editable>
            <layouts.group code="state">
              <controls.select v-bind="{ collection: issue_state_mapping_collection, labelMethod: 'label', valueMethod: 'value' }" />
            </layouts.group>
          </template>

          <IssueStateBadge :state="issue_info.state" />
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="priority" title="优先级">
          <template #editable>
            <layouts.group code="priority">
              <controls.select v-bind="{ collection: ISSUE_PRIORITY_OPTIONS, labelMethod: 'label', valueMethod: 'value' }" />
            </layouts.group>
          </template>

          <span :class="{'text-danger': issue_info.priority == 'important'}">{{ issue_info.priority_text }}</span>
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="creator_id" title="创建人">
          <template #editable>
            <layouts.group code="creator_id">
              <controls.select v-bind="{ collection: creator_collection, labelMethod: 'name', valueMethod: 'id' }" />
            </layouts.group>
          </template>

          {{ issue_info.creator.name }}
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="assignee_id" title="受理人">
          <template #editable>
            <layouts.group code="assignee_id">
              <controls.select v-bind="{ collection: assignee_collection, labelMethod: 'name', valueMethod: 'id' }" />
            </layouts.group>
          </template>

          {{ issue_info.assignee?.name ?? '无' }}
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="category_id" title="分类">
          <template #editable>
            <layouts.group code="category_id">
              <controls.bootstrap_select v-bind="{ live_search: true, collection: categories, labelMethod: 'name', valueMethod: 'id' }" />
            </layouts.group>
          </template>

          <CategoryBadgeVue :category="_.find(categories, { id: issue_info.category_id })" />
        </IssueDetailEdit>

        <IssueDetailEdit v-bind="{ former }" code="milestone_id" title="里程碑">
          <template #editable>
            <layouts.group code="milestone_id">
              <controls.select v-bind="{ collection: milestones, labelMethod: 'title', valueMethod: 'id' }" />
            </layouts.group>
          </template>

          {{ _.find(milestones, { id: issue_info.milestone_id })?.title ?? '无' }}
        </IssueDetailEdit>

        <div class="d-flex flex-column">
          <div class="h5">订阅</div>
          <div class="mt-1">
            <button v-if="_.find(issue_info.subscriptions, it => it.user_id == current_user.id)" class="btn border border-secondary bg-light w-100 text-dark" @click="unsubscribe">取消订阅</button>
            <button v-else class="btn border border-secondary bg-light w-100 text-dark" @click="subscribe">订阅问题</button>
            <div class="mt-2 small text-muted">{{ issue_info.subscriptions.length }} 人订阅:</div>
            <div class="x-actions">
              <img v-for="subscription in issue_info.subscriptions" v-tooltip:top="subscription.member.name" class="rounded-circle avatar" :src="subscription.member.avatar_url" width="30">
            </div>
          </div>
        </div>
      </div>

      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryBadgeVue from "@/components/CategoryBadge.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { DATE_LONG_FORMAT, ISSUE_PRIORITY_OPTIONS, ISSUE_STATE_MAPPING } from "@/constants"
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { IssueInfo } from "@/models"
import { usePageStore } from "@/store"
import { useSessionStore } from "@/store/session"
import _ from "lodash"
import { computed, getCurrentInstance, ref } from "vue"
import IssueDetailEdit from "./IssueDetailEdit.vue"

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const current_user = store.account.user
const page = usePageStore()

const props = defineProps<{
  issue_info: IssueInfo
}>()
const emit = defineEmits<{
  changed: [ IssueInfo ]
}>()

const former = Former.build({
  state: props.issue_info.state,
  priority: props.issue_info.priority,
  creator_id: props.issue_info.creator_id,
  assignee_id: props.issue_info.assignee_id,
  category_id: props.issue_info.category_id,
  milestone_id: props.issue_info.milestone_id,
})

former.perform = async function(code: string) {
  const a_issue_action = await new q.bug.IssueActionReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform({ [code]: this.form[code] })

  Object.assign(props.issue_info, a_issue_action.issue)
  props.issue_info.activities.push(...a_issue_action.activities)
  emit('changed', props.issue_info)
}

const members = ref(await page.inProject().request(q.project.MemberReq.List).setup(proxy).perform())
const categories = ref(await page.inProject().request(q.project.CategoryReq.List).setup(proxy).perform())
const milestones = ref(await page.inProject().request(q.project.MilestoneReq.List).setup(proxy).perform())

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
  const a_subscription = await new q.bug.SubscriptionReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform()

  props.issue_info.subscriptions.push(a_subscription)
  emit("changed", props.issue_info)
}

async function unsubscribe() {
  await new q.bug.SubscriptionReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform()

  const index = props.issue_info.subscriptions.findIndex(it => it.user_id == current_user.id)
  props.issue_info.subscriptions.splice(index, 1)
  emit("changed", props.issue_info)
}

</script>

<template>
  <div>
    <button class="btn btn-secondary btn-block d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#issueDetailCollapse">
      修改问题
    </button>

    <div id="issueDetailCollapse" class="collapse d-md-block">
      <span class="small text-muted mt-2 d-flex">创建时间</span>
      <span>{{ h.datetime(issue_info.created_at) }}</span>
      <hr>

      <div>
        <FormErrorAlert :validations="former.validations" />

        <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="state" title="状态">
          <template #editable>
            <layouts.group code="state">
              <controls.bootstrap_select>
                <BSOption v-for="item in OPTIONS_FOR_ISSUE_STATE" :value="item.value">
                  <i class="fas fa-circle" :style="{ color: utils.calcColorHex(item.value) }"></i>
                  {{ item.label }}
                </BSOption>
              </controls.bootstrap_select>
            </layouts.group>
          </template>

          <IssueStateBadge :state="issue_info.state" />
        </IssueDetailEdit>

        <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="priority" title="优先级">
          <template #editable>
            <layouts.group code="priority">
              <controls.select>
                <OptionsForSelect :collection="ISSUE_PRIORITY_OPTIONS" />
              </controls.select>
            </layouts.group>
          </template>

          <span :class="{'text-danger': issue_info.priority == 'important'}">{{ issue_info.priority_text }}</span>
        </IssueDetailEdit>

        <IssueDetailEdit :editable="!readonly && allow('manage', issue_info)" v-bind="{ former, issue_info }" code="creator_id" title="创建人">
          <template #editable>
            <layouts.group code="creator_id">
              <controls.select include_blank>
                <OptionsForMember :collection="members" />
              </controls.select>
            </layouts.group>
          </template>

          {{ issue_info.creator.name }}
        </IssueDetailEdit>

        <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="assignee_id" title="受理人">
          <template #editable>
            <layouts.group code="assignee_id">
              <controls.select include_blank>
                <OptionsForMember :collection="members" except_level="reporter" />
              </controls.select>
            </layouts.group>
          </template>

          {{ issue_info.assignee?.name ?? '无' }}
        </IssueDetailEdit>

        <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="category_id" title="分类">
          <template #editable>
            <layouts.group code="category_id">
              <controls.bootstrap_select>
                <BSOption v-for="category in categories" :value="category.id">
                  <i class="fas fa-circle" :style="{ color: category.color }"></i>
                  {{ category.name }}
                </BSOption>
              </controls.bootstrap_select>
            </layouts.group>
          </template>

          <CategoryBadgeVue :category="_.find(categories, { id: issue_info.category_id })" />
        </IssueDetailEdit>

        <IssueDetailEdit :editable="!readonly && allow('update', issue_info)" v-bind="{ former, issue_info }" code="milestone_id" title="里程碑">
          <template #editable>
            <layouts.group code="milestone_id">
              <controls.select>
                <OptionsForSelect :collection="milestones.map(it => ({ label: it.title, value: it.id }))" />
              </controls.select>
            </layouts.group>
          </template>

          {{ _.find(milestones, { id: issue_info.milestone_id })?.title ?? '无' }}
        </IssueDetailEdit>

        <div class="d-flex flex-column" v-if="!readonly">
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
import BSOption from "@/components/BSOption.vue"
import CategoryBadgeVue from "@/components/CategoryBadge.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import OptionsForMember from "@/components/OptionsForMember.vue"
import OptionsForSelect from "@/components/OptionsForSelect.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
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

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const current_user = store.account.user
const page = usePageStore()
const allow = page.inProject().allow

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

former.perform = async function(code: string) {
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

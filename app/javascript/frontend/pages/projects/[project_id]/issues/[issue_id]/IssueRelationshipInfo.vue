<template>
  <div class="issue-relationship d-flex align-items-center">
    <img class="rounded-circle avatar me-1" :src="issue_relationship.member.avatarUrl()" width="20">
    <span>{{ issue_relationship.member.name }}</span>

    <span class="text-primary">
      <router-link class="mx-1" :to="`/projects/${target.project_id}/issues/${target.project_id}`">#{{ target.id }} {{ target.titleWithPriority() }}</router-link>
    </span>
    <span :class="`text text-issue-${target.state} small me-2`">({{ target.state_text }})</span>
    <span>标记为该问题的相关问题</span>
    <span class="small text-muted ms-auto">{{ utils.humanize(issue_relationship.created_at, DATE_LONG_FORMAT) }}</span>

    <div class="dropdown dropdown-no-arrow ms-1">
      <button class="btn btn-sm btn-light dropdown-toggle text-muted" data-bs-toggle="dropdown" style="background: transparent;">
        <i class="far fa-ellipsis-h" aria-hidden="true" />
      </button>
      <div class="dropdown-menu dropdown-menu-end" style="min-width: auto;">
        <a class="small dropdown-item" @click="destoryIssueRelationShip">取消关联</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from "vue"

import { DATE_LONG_FORMAT } from '@/constants'
import * as utils from "@/lib/utils"
import { IssueRelationship } from "@/models"
import * as requests from "@/requests"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue_relationship: IssueRelationship
  project_id: number
  issue_id: number
}>()
const emits = defineEmits<{
  destoryRelationship: [issue_relationship: IssueRelationship]
}>()

const issue = computed(() => {
  return props.issue_relationship.source
})

const target = computed(() => {
  if (issue.value == props.issue_relationship.source) {
    return props.issue_relationship.target
  } else {
    return props.issue_relationship.source
  }
})

async function destoryIssueRelationShip() {
  if (!confirm("确认删除问题的关联？")) {
    return
  }
  const issue_relationship = await new requests.IssueRelationshipDestroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.project_id
    req.interpolations.issue_id = props.issue_id
    req.interpolations.issue_relationship_id = props.issue_relationship.id
  }).perform()

  if (issue_relationship) {
    emits("destoryRelationship", issue_relationship)
  }
}
</script>

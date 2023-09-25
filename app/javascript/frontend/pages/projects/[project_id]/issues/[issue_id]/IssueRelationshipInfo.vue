<template>
  <div class="issue-relationship d-flex align-items-center x-spacer-2">
    <MemberLabel :member="issue_relationship.member" />

    <span>将问题</span>
    <span v-if="direction === 'source'">关联到</span>
    <span v-else>关联自</span>

    <router-link :to="`/projects/${other.project_id}/issues/${other.id}`">#{{ other.id }} {{ other.titleWithPriority() }}</router-link>

    <span class="small text-muted">{{ utils.humanize(issue_relationship.created_at, DATE_LONG_FORMAT) }}</span>

    <MoreDropdown class="ms-auto">
      <a class="small dropdown-item" href="#" @click.prevent="deleteIssueRelationShip">取消关联</a>
    </MoreDropdown>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from "vue"

import MemberLabel from "@/components/MemberLabel.vue"
import { DATE_LONG_FORMAT } from '@/constants'
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { IssueInfo, IssueRelationship } from "@/models"
import MoreDropdown from "@/components/MoreDropdown.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue_info: IssueInfo
  issue_relationship: IssueRelationship
}>()
const emit = defineEmits<{
  updated: [ IssueInfo ]
}>()

const direction = computed(() => {
  return props.issue_relationship.source.id === props.issue_info.id ? "source" : "target"
})

const other = computed(() => {
  return direction.value === 'source' ? props.issue_relationship.target : props.issue_relationship.source
})

async function deleteIssueRelationShip() {
  if (!confirm("确认删除问题的关联？")) {
    return
  }

  await new q.bug.IssueRelationshipReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
    req.interpolations.issue_relationship_id = props.issue_relationship.id
  }).perform()

  if (direction.value === 'source') {
    const source_index = props.issue_info.source_relationships.findIndex(it => it.id == props.issue_relationship.id)
    props.issue_info.source_relationships.splice(source_index, 1)
  } else {
    const target_index = props.issue_info.target_relationships.findIndex(it => it.id == props.issue_relationship.id)
    props.issue_info.target_relationships.splice(target_index, 1)
  }

  emit("updated", props.issue_info)
}
</script>

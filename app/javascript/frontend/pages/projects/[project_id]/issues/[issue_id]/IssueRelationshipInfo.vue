<template>
  <div class="flex items-center gap-x-2">
    <MemberLabel :member="issue_relationship.member" />

    <span>将问题</span>
    <span v-if="direction === 'source'">关联到</span>
    <span v-else>关联自</span>

    <router-link :to="`/projects/${other.project_id}/issues/${other.id}`" class="link">#{{ other.id }} {{ other.titleWithPriority() }}</router-link>

    <span class="text-sm text-muted">{{ h.datetime(issue_relationship.created_at) }}</span>

    <MoreDropdown v-if="!readonly && allow('destroy', IssueRelationship)">
      <DropdownMenuItem @click.prevent="deleteIssueRelationShip">取消关联</DropdownMenuItem>
    </MoreDropdown>
  </div>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { IssueInfo, IssueRelationship } from "@/models"
import { usePageStore } from "@/store"
import { computed, getCurrentInstance } from "vue"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui'

const proxy = getCurrentInstance()!.proxy as any
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  issue_info: IssueInfo
  issue_relationship: IssueRelationship
  readonly: boolean
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

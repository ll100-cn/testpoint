<template>
  <div class="flex items-center gap-x-2">
    <MemberLabel :member="issue_relationship.member" />

    <span>将问题</span>
    <span v-if="direction === 'source'">关联到</span>
    <span v-else>关联自</span>

    <router-link :to="`/projects/${other.project_id}/issues/${other.id}`" class="link">#{{ other.id }} {{ other.titleWithPriority() }}</router-link>

    <span class="text-sm text-muted">{{ h.datetime(issue_relationship.created_at) }}</span>

    <MoreDropdown v-if="!readonly && allow('destroy', IssueRelationship)">
      <DropdownMenuItem v-confirm="'确认删除问题的关联？'" @click.prevent="deleteIssueRelationship">取消关联</DropdownMenuItem>
    </MoreDropdown>
  </div>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/requests'
import { Issue, type IssueBox, IssueRelationship } from "@/models"
import { usePageStore } from "@/store"
import { computed, getCurrentInstance } from "vue"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'
import { useQueryLine } from '@/lib/useQueryLine'
import vConfirm from '@/components/vConfirm'

const line = useQueryLine()
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  readonly: boolean
  issue_box: IssueBox
  issue_relationship: IssueRelationship
}>()
const emit = defineEmits<{
  updated: [IssueBox]
}>()

const direction = computed(() => {
  return props.issue_relationship.source.id === props.issue_box.issue.id ? "source" : "target"
})

const other = computed(() => {
  return direction.value === 'source' ? props.issue_relationship.target : props.issue_relationship.source
})

const { mutateAsync: destroy_issue_relationship_action } = line.request(q.bug.issue_relationships.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function deleteIssueRelationship() {
  await destroy_issue_relationship_action({
    interpolations: {
      project_id: props.issue_box.issue.project_id,
      issue_id: props.issue_box.issue.id,
      relationship_id: props.issue_relationship.id
    }
  })

  if (direction.value === 'source') {
    const source_index = props.issue_box.source_relationships.findIndex((it: IssueRelationship) => it.id == props.issue_relationship.id)
    props.issue_box.source_relationships.splice(source_index, 1)
  } else {
    const target_index = props.issue_box.target_relationships.findIndex((it: IssueRelationship) => it.id == props.issue_relationship.id)
    props.issue_box.target_relationships.splice(target_index, 1)
  }

  emit("updated", props.issue_box)
}
</script>

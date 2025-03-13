<template>
  <div class="p-4">
    <a v-if="!readonly && allow('update', TestCase)" href="#" @click="onBatch?.(CaseBatchEditDialogContent, select_test_cases)">编辑 ({{ select_test_case_ids.length }})</a>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead role="checkbox" v-if="!readonly && allow('update', TestCase)">
            <CheckboxToggle v-model="select_test_case_ids" :collection="test_cases.map(it => it.id)" />
          </TableHead>
          <TableHead scope="col">标题</TableHead>
          <TableHead scope="col">平台</TableHead>
          <TableHead scope="col">标签</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="test_case in test_cases" :key="test_case.id">
          <TableCell role="checkbox" v-if="!readonly && allow('update', test_case)">
            <Checkbox v-model="select_test_case_ids" :value="test_case.id" />
          </TableCell>
          <TableCell>
            <a href="#" @click.prevent="onModal?.(CaseShowDialogContent, test_case)" class="link">
              <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
              {{ test_case.title }}
            </a>

            <template v-if="!test_case.requirement_id">
              <Badge preset="outline" variant="secondary" class="ms-2 text-secondary">未关联</Badge>
            </template>
            <template v-else-if="test_case.roadmap_id != newest_roadmap.id">
              <Badge preset="outline" variant="secondary" class="ms-2 text-secondary">已过期</Badge>
            </template>
          </TableCell>
          <TableCell class="space-x-2">
            <PlatformBadge v-for="platform_id in test_case.platform_ids" :platform="platform_repo.id.find(platform_id)" />
          </TableCell>
          <TableCell>
            <CaseLabelCell :label_ids="test_case.label_ids" :label_repo="label_repo" />
          </TableCell>
        </TableRow>
      </TableBody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$ui/table'
import { EntityRepo, Platform, Roadmap, TestCase, TestCaseLabel } from "@/models"
import { usePageStore } from "@/store"
import { type Component, computed, ref } from "vue"
import CaseBatchEditDialogContent from "./CaseBatchEditDialogContent.vue"
import CaseLabelCell from "./CaseLabelCell.vue"
import CaseShowDialogContent from "./CaseShowDialogContent.vue"
import PlatformBadge from '@/components/PlatformBadge.vue'
import { Badge } from '$ui/badge'
import CheckboxToggle from '@/components/CheckboxToggle.vue'
import { Checkbox } from '$ui/input'

const page = usePageStore()
const allow = page.inProject()!.allow

export interface Listeners {
  onModal?: (component: Component, test_case: TestCase) => void
  onBatch?: (component: Component, test_cases: TestCase[]) => void
}

export interface Props {
  label_repo: EntityRepo<TestCaseLabel>
  platform_repo: EntityRepo<Platform>
  test_cases: TestCase[]
  newest_roadmap: Roadmap
  readonly: boolean
}

const props = defineProps<Props & Listeners>()

const select_test_case_ids = ref([] as number[])

const select_test_cases = computed(() => {
  return props.test_cases.filter((it) => {
    return select_test_case_ids.value.includes(it.id)
  })
})
</script>

<template>
  <div id="tp-main">
    <a v-if="allow('update', TestCase)" href="#" @click="onBatch?.(CaseBatchEditDialogContent, select_test_cases)">编辑 ({{ select_test_case_ids.length }})</a>
    <Table data-controller="select-all">
      <TableHeader>
        <TableRow>
          <TableHead v-if="allow('update', TestCase)"><input type="checkbox" data-target="select-all.handle" data-action="select-all#toggleAll"></TableHead>
          <TableHead scope="col">标题</TableHead>
          <TableHead scope="col">平台</TableHead>
          <TableHead scope="col">标签</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="test_case in test_cases" :key="test_case.id">
          <TableCell v-if="allow('update', test_case)">
            <input v-model="select_test_case_ids" type="checkbox" :value="test_case.id" role="switch" data-target="select-all.item" data-action="select-all#toggle">
          </TableCell>
          <TableCell>
            <a href="#" @click="onModal?.(CaseShowDialogContent, test_case)" class="link">
              <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
              {{ test_case.title }}
            </a>
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$vendor/ui'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from "@/models"
import { usePageStore } from "@/store"
import { type Component, computed, ref } from "vue"
import CaseBatchEditDialogContent from "./CaseBatchEditDialogContent.vue"
import CaseLabelCell from "./CaseLabelCell.vue"
import CaseShowDialogContent from "./CaseShowDialogContent.vue"
import PlatformBadge from '@/components/PlatformBadge.vue'

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
}

const props = defineProps<Props & Listeners>()

const select_test_case_ids = ref<number[]>([])

const select_test_cases = computed(() => {
  return props.test_cases.filter((it) => {
    return select_test_case_ids.value.includes(it.id)
  })
})
</script>

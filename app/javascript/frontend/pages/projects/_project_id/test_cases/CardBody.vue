<template>
  <div class="card-body d-flex">
    <div class="col-12 col-md-4 col-xl-3 border-end py-3">
      <FolderSide :filter="filter" :test_case_stats="test_case_stats" />
    </div>

    <div class="col">
      <CaseTable
        :test_cases="avaiable_test_cases"
        :platform_repo="platform_repo"
        :label_repo="label_repo"
        @change="emit('change', $event)"
        @destroy="emit('destroy', $event)"
        @batch_change="emit('batch_change')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel, TestCaseStat } from '@/models'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { PropType, computed } from 'vue'
import CaseTable from './CaseTable.vue'
import FolderSide from '../FolderSide.vue'
import { ColumnFilter, Filter } from '../types'

const props = defineProps({
  label_repo: {
    type: Object as PropType<EntityRepo<TestCaseLabel>>,
    required: true
  },
  platform_repo: {
    type: Object as PropType<EntityRepo<Platform>>,
    required: true
  },
  test_cases: {
    type: Array<TestCase>,
    required: true
  },
  filter: {
    type: Object as PropType<Filter>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
  (e: 'batch_change'): void
}>()

const test_case_stats = computed(() => {
  const result = _(props.test_cases).groupBy((it) => {
    return JSON.stringify({ archived: it.archived, role_name: it.role_name, scene_path: it.scene_path })
  }).mapValues((it) => {
    return it.length
  }).map((count, json) => {
    const stat = plainToClass(TestCaseStat, JSON.parse(json))
    stat.count = count
    return stat
  }).value()

  const stat = result.find((it) => {
    return props.filter.isMatch(it as any, new ColumnFilter({ only: [ 'role_name', 'scene_path', 'archived' ] }))
  })

  if (!stat) {
    const empty_stat = new TestCaseStat()
    empty_stat.archived = props.filter.archived === '1'
    empty_stat.role_name = props.filter.role_name === '' ? null : props.filter.role_name
    empty_stat.scene_path = props.filter.scene_path ?? []
    empty_stat.count = 0
    result.push(empty_stat)
  }

  return result
})

const avaiable_test_cases = computed(() => {
  let scope = _(props.test_cases)

  const columns = new ColumnFilter({ expect: [ 'platform_id', 'label_id' ] })
  scope = scope.filter((it) => props.filter.isMatch(it, columns))

  return scope.value()
})

</script>

<template>
  <div class="flex">
    <div class="w-full md:w-1/3 xl:w-1/4 py-3 border-e">
      <FolderSide :filter="filter" :test_case_stats="test_case_stats" />
    </div>

    <div class="flex-1">
      <CaseTable v-bind="props" :test_cases="avaiable_test_cases" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TestCaseStat } from '@/models'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed } from 'vue'
import FolderSide from '../FolderSide.vue'
import { ColumnFilter, Filter } from '../types'
import CaseTable, { type Props, type Listeners } from './CaseTable.vue'

const props = defineProps<Props & Listeners & {
  filter: Filter
}>()

const test_case_stats = computed(() => {
  const result = _(props.test_cases).groupBy((it) => {
    return JSON.stringify({ archived: it.archived, roleName: it.roleName, scenePath: it.scenePath })
  }).mapValues((it) => {
    return it.length
  }).map((count, json) => {
    const stat = plainToClass(TestCaseStat, JSON.parse(json))
    stat.count = count
    return stat
  }).value()

  const stat = result.find((it) => {
    return props.filter.isMatch(it as any, new ColumnFilter({ only: [ 'roleName', 'scenePath', 'archived' ] }))
  })

  if (!stat) {
    const empty_stat = new TestCaseStat()
    empty_stat.archived = props.filter.archived === '1'
    empty_stat.roleName = props.filter.roleName === '' ? null : props.filter.roleName
    empty_stat.scenePath = props.filter.scenePath ?? []
    empty_stat.count = 0
    result.push(empty_stat)
  }

  return result
})

const avaiable_test_cases = computed(() => {
  let scope = _(props.test_cases)

  scope = scope.filter((it) => props.filter.isMatch(it))

  return scope.value()
})

</script>

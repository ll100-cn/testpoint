<template>
  <div class="card-body d-flex">
    <div class="col-12 col-md-4 col-xl-3 border-end py-3">
      <FolderSide :filter="filter" :test_case_stats="test_case_stats" />
    </div>

    <div class="col">
      <CaseTable :test_cases="avaiable_test_cases" :platform_repo="platform_repo" :label_repo="label_repo" @change="emit('change', $event)" @batch_change="emit('batch_change')" />
    </div>
  </div>
</template>


<script setup lang="ts">
import FolderSide from './FolderSide.vue'
import { ChangeFilterFunction, Filter } from './types'
import CaseTable from './CaseTable.vue'
import { useRoute, useRouter } from 'vue-router'
import { EntityRepo, Platform, TestCase, TestCaseLabel, TestCaseStat } from '@/models'
import * as requests from '@/requests'
import qs from "qs"
import _ from 'lodash'
import { computed, getCurrentInstance, PropType, provide } from 'vue'
import { plainToClass } from 'class-transformer'

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

  return result
})

const avaiable_test_cases = computed(() => {
  let scope = _(props.test_cases)
  if (props.filter.role_name) {
    scope = scope.filter(it => it.role_name === (props.filter.role_name === "" ? null : props.filter.role_name))
  }
  if (props.filter.archived) {
    scope = scope.filter(it => it.archived === (props.filter.archived === "1" ? true : false))
  }
  if (!_.isEmpty(props.filter.scene_path)) {
    scope = scope.filter(it => {
      return _.isEqual(props.filter.scene_path, _.slice(it.scene_path, 0, props.filter.scene_path.length))
    })
  }
  return scope.value()
})

</script>
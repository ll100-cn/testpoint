<template>
  <div class="card page-card">
    <div class="card-header bg-white d-flex">
      <FormInline v-bind="{ former }" @submit.prevent="former.submit">
        <layouts.group v-slot="slotProps" code="platform_id" label="平台">
          <forms.dropdown v-bind="{ ...slotProps, form: former.form }" #default="{ Component }" @change="former.submit">
            <component v-for="platform in _platforms" :is="Component" :value="platform.id">
              <span class="fas fa-circle me-2 small" :style="{ color: utils.calcColorHex(platform.name) }" />
              {{ platform.name }}
            </component>
            <div class="dropdown-divider" />
            <router-link class="dropdown-item" target="_blank" :to="`/projects/${project_id}/platforms`">平台列表</router-link>
          </forms.dropdown>
        </layouts.group>

        <layouts.group v-slot="slotProps" code="label_id" label="标签">
          <forms.dropdown v-bind="{ ...slotProps, form: former.form }" #default="{ Component }" @change="former.submit">
            <component v-for="label in _labels" :is="Component" :value="label.id">{{ label.name }}</component>
            <div class="dropdown-divider" />
            <router-link class="dropdown-item" target="_blank" :to="`/projects/${project_id}/test_case_labels`">标签列表</router-link>
          </forms.dropdown>
        </layouts.group>

        <layouts.group v-slot="slotProps" code="group_name_search" label="分组">
          <forms.string v-bind="{ ...slotProps, form: former.form }" />
        </layouts.group>
      </FormInline>

      <div class="d-flex ms-auto x-spacer-3 align-items-center">
        <a class="btn btn-primary btn-sm" href="#" @click="showModal(project_id)">新增用例</a>
      </div>
    </div>

    <CardBody
      :test_cases="search_test_cases"
      :platform_repo="platform_repo"
      :label_repo="lable_repo"
      :filter="filter"
      @change="onTestCaseChanged"
      @destroy="onTestCaseDestroyed"
      @batch_change="onBatchChanged" />

    <CardNew ref="modal" :platform_repo="platform_repo" :label_repo="lable_repo" @create="onTestCaseCreated" />
  </div>
</template>

<script setup lang="ts">
import FormInline from '@/components/FormInline.vue'
import { forms, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import * as utils from '@/lib/utils'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, getCurrentInstance, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChangeFilterFunction, Filter } from '../types'
import CardBody from './CardBody.vue'
import CardNew from './CardNew.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)

class Search {
  group_name_search: string | null
  platform_id: string | null
  label_id: string | null
}

const search = ref(plainToClass(Search, query))
const filter = plainToClass(Filter, query.f ?? {})

const former = Former.build(search)
former.perform = async function() {
  router.push({ query: utils.plainToQuery(this.form) })
}

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void
}>()

const project_id = _.toNumber(params.project_id)
const test_cases = await new requests.TestCaseReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query.milestone_id = route.query.milestone_id
}).perform()

const _labels = ref(await new requests.TestCaseLabelReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const lable_repo = computed(() => {
  return new EntityRepo<TestCaseLabel>(_labels.value)
})

const _platforms = ref(await new requests.PlatformReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const platform_repo = computed(() => {
  return new EntityRepo<Platform>(_platforms.value)
})


const search_test_cases = computed(() => {
  let scope = _(test_cases)

  const platform = platform_repo.value.find(_.toNumber(query.platform_id))
  if (platform) {
    scope = scope.filter(it => it.platform_ids.includes(platform.id))
  }

  const label = lable_repo.value.find(_.toNumber(query.label_id))
  if (label) {
    scope = scope.filter(it => it.label_ids.includes(label.id))
  }

  if (query.group_name_search) {
    scope = scope.filter((it) => it.group_name?.includes(query.group_name_search))
  }

  return scope.value()
})

const changeFilter: ChangeFilterFunction = (overrides) => {
  const data = utils.compactObject({ ...query, f: { ...filter, ...overrides } })
  router.push({ query: utils.plainToQuery(data) })
}

provide("changeFilter", changeFilter)

const modal = ref<InstanceType<typeof CardNew>>()
function showModal(project_id: number) {
  modal.value.show(project_id.toString())
}

function onTestCaseChanged(test_case: TestCase) {
  router.go(0)
}

function onTestCaseDestroyed(test_case: TestCase) {
  router.go(0)
}

function onBatchChanged() {
  router.go(0)
}

function onTestCaseCreated(test_case: TestCase) {
  router.go(0)
}

</script>

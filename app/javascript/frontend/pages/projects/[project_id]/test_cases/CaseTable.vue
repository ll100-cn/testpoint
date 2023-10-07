<template>
  <div id="tp-main">
    <a v-if="allow('update', TestCase)" href="#" @click="emit('batch', CaseBatchEditFrame, select_test_cases)">编辑 ({{ select_test_case_ids.length }})</a>
    <table class="table" data-controller="select-all">
      <thead>
        <tr>
          <th v-if="allow('update', TestCase)"><input type="checkbox" data-target="select-all.handle" data-action="select-all#toggleAll"></th>
          <th scope="col">标题</th>
          <th scope="col">平台</th>
          <th scope="col">标签</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="test_case in test_cases" :key="test_case.id">
          <td v-if="allow('update', test_case)">
            <input v-model="select_test_case_ids" type="checkbox" :value="test_case.id" role="switch" data-target="select-all.item" data-action="select-all#toggle">
          </td>
          <td>
            <a href="#" @click="emit('modal', CaseShowFrame, test_case)">
              <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
              {{ test_case.title }}
            </a>
          </td>
          <td>
            <CasePlatformCell :platform_ids="test_case.platform_ids" :platform_repo="platform_repo" />
          </td>
          <td>
            <CaseLabelCell :label_ids="test_case.label_ids" :label_repo="label_repo" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from "@/models"
import { usePageStore } from "@/store"
import { Component, PropType, computed, ref } from "vue"
import CaseBatchEditFrame from "./CaseBatchEditFrame.vue"
import CaseLabelCell from "./CaseLabelCell.vue"
import CasePlatformCell from "./CasePlatformCell.vue"
import CaseShowFrame from "./CaseShowFrame.vue"

const page = usePageStore()
const allow = page.inProject().allow

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
  }
})

export type Emits = {
  modal: [ Component, TestCase ],
  batch: [ Component, TestCase[] ],
}

const emit = defineEmits<Emits>()

const select_test_case_ids = ref<number[]>([])

const select_test_cases = computed(() => {
  return props.test_cases.filter((it) => {
    return select_test_case_ids.value.includes(it.id)
  })
})
</script>

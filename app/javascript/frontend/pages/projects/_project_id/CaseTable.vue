<template>
  <div id="tp-main">
    <a href="#" @click="batchEdit()">编辑 ({{ select_test_case_ids.length }})</a>
    <table class="table" data-controller="select-all">
      <thead>
        <tr>
          <th><input type="checkbox" data-target="select-all.handle" data-action="select-all#toggleAll" /></th>
          <th scope="col">标题</th>
          <th scope="col">平台</th>
          <th scope="col">标签</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="test_case in test_cases" :key="test_case.id">
          <td>
            <input type="checkbox" :value="test_case.id" v-model="select_test_case_ids" role="switch" data-target="select-all.item" data-action="select-all#toggle" />
          </td>
          <td>
            <a href="#" @click="showModal(test_case)">
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
  <Teleport to="body">
    <CaseModal ref="modal" :platform_repo="platform_repo"
                           :label_repo="label_repo"
                           @change="emit('change', $event)"
                           @destroy="emit('destroy', $event)" />
  </Teleport>

  <CaseBatchEditModal ref="batch_edit_modal" :platform_repo="platform_repo" :label_repo="label_repo" @batch_change="emit('batch_change')" />
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from "@/models";
import CasePlatformCell from "./CasePlatformCell.vue"
import CaseLabelCell from "./CaseLabelCell.vue"
import CaseModal from "./CaseModal.vue"
import { PropType, computed, ref } from "vue";
import CaseBatchEditModal from "./CaseBatchEditModal.vue"
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

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
  (e: 'batch_change'): void
}>()

const modal = ref<InstanceType<typeof CaseModal>>()
function showModal(test_case: TestCase) {
  modal.value.show(test_case)
}

const select_test_case_ids = ref<number[]>([])

const select_test_cases = computed(() => {
  return props.test_cases.filter((it) => {
    return select_test_case_ids.value.includes(it.id)
  })
})

const batch_edit_modal = ref<InstanceType<typeof CaseBatchEditModal>>()
function batchEdit() {
  batch_edit_modal.value.show(select_test_cases.value)
}

</script>

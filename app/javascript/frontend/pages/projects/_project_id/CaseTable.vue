<template>
  <div id="tp-main">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">标题</th>
          <th scope="col">平台</th>
          <th scope="col">标签</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="test_case in test_cases" :key="test_case.id">
          <td>
            <a href="#" @click="showModal(test_case)">{{ test_case.title }}</a>
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
    <CaseModal ref="modal" :platform_repo="platform_repo" :label_repo="label_repo" @change="emit('change', $event)" />
  </Teleport>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from "@/models";
import CasePlatformCell from "./CasePlatformCell.vue"
import CaseLabelCell from "./CaseLabelCell.vue"
import CaseModal from "./CaseModal.vue"
import { PropType, ref } from "vue";

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
  (e: 'change', test_case: TestCase): void
}>()

const modal = ref<InstanceType<typeof CaseModal>>()
function showModal(test_case: TestCase) {
  modal.value.show(test_case)
}

</script>
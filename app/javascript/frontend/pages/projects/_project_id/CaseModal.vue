<template>
  <div class="modal" tabindex="-1" ref="modal">
    <template v-if="test_case">
      <div class="modal-dialog modal-lg" v-if="mode == 'show'">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ test_case.title }}</h5>
            <a href="#" @click="mode = 'edit'">编辑</a>
          </div>
          <div class="modal-body">
            <textarea data-controller="markdown" readonly class="d-none">{{ test_case.content }}</textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      <CaseEditFrame v-if="mode == 'edit'" :test_case="test_case" :platform_repo="platform_repo" :label_repo="label_repo" @change="emit('change', $event)" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models';
import { Modal } from 'bootstrap';
import { PropType, nextTick, ref } from 'vue';
import CaseEditFrame from './CaseEditFrame.vue'

const props = defineProps({
  platform_repo: {
    type: Object as PropType<EntityRepo<Platform>>,
    required: true
  },
  label_repo: {
    type: Object as PropType<EntityRepo<TestCaseLabel>>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void
}>()

const test_case = ref<TestCase | null>()
const mode = ref('show')

const modal = ref<InstanceType<typeof HTMLElement>>()

function show(a_test_case: TestCase) {
  mode.value = 'show'
  test_case.value = a_test_case

  nextTick(() => {
    const $modal = Modal.getOrCreateInstance(modal.value)
    $modal.show()
  })
}

defineExpose({
  show
})
</script>
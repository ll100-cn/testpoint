<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          #{{ test_case.id }}
          <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
          {{ test_case.title }}
        </h5>
        <a v-if="allow('update', test_case)" href="#" @click="emit('changeMode', 'edit')">编辑</a>
      </div>
      <div class="modal-body">
        <textarea ref="textarea" readonly data-controller="markdown" data-action="render->markdown#render" class="d-none">{{ test_case.content }}</textarea>

        <div class="collapse show btn-toggle text-center p-1">
          <a class="btn btn-link mx-auto" data-bs-toggle="collapse" data-bs-target=".btn-toggle" role="button">
            <i class="far fa-history me-1" />显示历史版本
          </a>
        </div>

        <div class="collapse multi-collapse btn-toggle mt-4">
          <div class="accordion">
            <div v-for="(version_case, index) in props.history" :key="version_case.id" class="accordion-item">
              <h2 :id="`test_case_version_${index}_header`" class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#test_case_version_${index}_body`" aria-expanded="false" :aria-controls="`test_case_version_${index}_body`">
                  {{ h.datetime(version_case.updated_at) }}
                </button>
              </h2>

              <div :id="`test_case_version_${index}_body`" class="accordion-collapse collapse" :aria-labelledby="`test_case_version_${index}_header`">
                <div class="accordion-body">
                  <textarea v-model="version_case.content" data-controller="markdown" readonly class="d-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer x-spacer-2">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DATETIME_LONG_FORMAT } from '@/constants'
import * as h from '@/lib/humanize'
import { TestCase } from '@/models'
import { usePageStore } from '@/store'
import test from 'node:test'
import { PropType, onUpdated, ref } from 'vue'

const page = usePageStore()
const allow = page.inProject().allow

const props = defineProps({
  test_case: {
    type: Object as PropType<TestCase>,
    required: true
  },
  history: {
    type: Array as PropType<TestCase[]>,
    required: true
  }
})

const textarea = ref()

const emit = defineEmits<{
  changeMode: [mode: string]
}>()

onUpdated(() => {
  if (textarea.value) {
    textarea.value.dispatchEvent(new Event('render'))
  }
})

</script>

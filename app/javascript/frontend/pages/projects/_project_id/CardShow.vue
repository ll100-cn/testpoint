<template>
  <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          #{{ test_case.id }}
          <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
          {{ test_case.title }}
        </h5>
        <a href="#" @click="emit('changeMode', 'edit')">编辑</a>
      </div>
      <div class="modal-body">
        <textarea readonly data-controller="markdown" ref="textarea" data-action="render->markdown#render" class="d-none">{{ test_case.content }}</textarea>

        <div class="collapse show btn-toggle text-center p-1">
          <a class="btn btn-link mx-auto" data-bs-toggle="collapse" data-bs-target=".btn-toggle" role="button">
            <i class="far fa-history me-1"></i>显示历史版本
          </a>
        </div>

        <div class="collapse multi-collapse btn-toggle mt-4">
          <div class="accordion">
            <div class="accordion-item" v-for="(version_case, index) in props.history">
              <h2 class="accordion-header" :id="`test_case_version_${index}_header`">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#test_case_version_${index}_body`" aria-expanded="false" :aria-controls="`test_case_version_${index}_body`">
                  {{ version_case.updated_at }}
                </button>
              </h2>

              <div :id="`test_case_version_${index}_body`" class="accordion-collapse collapse" :aria-labelledby="`test_case_version_${index}_header`">
                <div class="accordion-body">
                  <textarea data-controller="markdown" readonly class="d-none">{{ version_case.content }}</textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TestCase } from '@/models';
import { PropType, ref, onUpdated } from 'vue';

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
  (e: 'changeMode', mode: string): void
}>()

onUpdated(() => {
  textarea.value.dispatchEvent(new Event('render'))
})

</script>

<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新建案例</h5>
        </div>
        <CaseForm :form="form" :platform_repo="platform_repo" :label_repo="label_repo" @create="submitForm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, ref, reactive, PropType } from 'vue';
import * as requests from '@/requests'
import { Modal } from 'bootstrap';
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models';

import { Validations, layouts, forms } from "@/components/simple_form";
import CaseForm from './CaseForm.vue';
const validations = reactive<Validations>(new Validations())

const props = defineProps({
  platform_repo: {
  type: Object  as PropType<EntityRepo<Platform>>,
    required: true,
  },
  label_repo: {
    type: Object  as PropType<EntityRepo<TestCaseLabel>>,
    required: true,
  }
});

const form = ref({
  title: null as string | null | undefined,
  content: null as string | null | undefined,
  role_name: null as string | null | undefined,
  scene_name: null as string | null | undefined,
  group_name: null as string | null | undefined,
  platform_ids: [] as number[],
  label_ids: [] as number[]
})

const { proxy } = getCurrentInstance()
const project_id = ref("")

const emit = defineEmits<{
  (e: 'create', test_case: TestCase): void
}>()

async function submitForm(event: Event) {
  event.preventDefault()

  const form_data = new FormData(event.target as HTMLFormElement)
  try {
    const new_test_case = await new requests.TestCaseCreateRequest().setup(req => {
      req.interpolations.project_id = project_id.value
    }).perform(proxy, form_data)

    $(event.target).closest('.modal').modal('hide')
    emit('create', new_test_case)
  } catch (err) {
    if (err instanceof requests.ErrorUnprocessableEntity) {
      validations.marge(err.validations, err.names)
      return
    }

    throw err
  }
}

const modal = ref<InstanceType<typeof HTMLElement>>()

function show(current_project_id: string) {
  project_id.value = current_project_id

  nextTick(() => {
    const $modal = Modal.getOrCreateInstance(modal.value)
    $modal.show()
  })
}

defineExpose({
  show
})
</script>

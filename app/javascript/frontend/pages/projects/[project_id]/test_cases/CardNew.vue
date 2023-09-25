<template>
  <div ref="modal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增案例</h5>
        </div>
        <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
          <div class="modal-body">
            <CaseForm :platform_repo="platform_repo" :label_repo="label_repo" v-bind="{ former }" />
          </div>

          <div class="modal-footer x-spacer-2">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <layouts.submit>保存</layouts.submit>
          </div>
        </layouts.form_horizontal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'
import { Modal } from 'bootstrap'
import { PropType, getCurrentInstance, nextTick, ref } from 'vue'
import CaseForm from './CaseForm.vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  platform_repo: {
    type: Object as PropType<EntityRepo<Platform>>,
    required: true,
  },
  label_repo: {
    type: Object as PropType<EntityRepo<TestCaseLabel>>,
    required: true,
  }
});

const former = Former.build({
  title: null as string | null | undefined,
  content: null as string | null | undefined,
  role_name: null as string | null | undefined,
  scene_name: null as string | null | undefined,
  group_name: null as string | null | undefined,
  platform_ids: [] as number[],
  label_ids: [] as number[]
})

former.perform = async function(event: SubmitEvent) {
  const new_test_case = await new q.case.TestCaseReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = project_id.value
  }).perform(this.form)

  const targe = event.target as HTMLElement
  const modal = Modal.getOrCreateInstance(targe.closest('.modal'))
  modal.hide()

  emit('create', new_test_case)
}

const project_id = ref("")

const emit = defineEmits<{(e: 'create', test_case: TestCase): void}>()

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

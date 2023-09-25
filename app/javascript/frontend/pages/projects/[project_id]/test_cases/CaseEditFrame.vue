<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ test_case.title }}</h5>
        <a href="#" class="text-danger small" @click="archiveTestCase">归档</a>
      </div>

      <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
        <div class="modal-body">
          <CaseForm :platform_repo="platform_repo" :label_repo="label_repo" v-bind="{ former }" />
        </div>

        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <layouts.submit>保存</layouts.submit>
        </div>z
      </layouts.form_horizontal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validations, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'
import { Modal } from 'bootstrap'
import $ from 'jquery'
import { PropType, getCurrentInstance, reactive } from 'vue'
import CaseForm from './CaseForm.vue'
const validations = reactive<Validations>(new Validations())

const { proxy } = getCurrentInstance()

const props = defineProps({
  platform_repo: {
    type: Object as PropType<EntityRepo<Platform>>,
    required: true
  },
  label_repo: {
    type: Object as PropType<EntityRepo<TestCaseLabel>>,
    required: true
  },
  test_case: {
    type: Object as PropType<TestCase>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
}>()

const former = Former.build({
  title: props.test_case.title,
  content: props.test_case.content,
  role_name: props.test_case.role_name,
  scene_name: props.test_case.scene_name,
  group_name: props.test_case.group_name,
  platform_ids: props.test_case.platform_ids,
  label_ids: props.test_case.label_ids
})

former.perform = async function(event) {
  const new_test_case = await new q.case.TestCaseReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = 1
    req.interpolations.id = props.test_case.id
  }).perform(this.form)

  const targe = event.target as HTMLElement
  const modal = Modal.getOrCreateInstance(targe.closest('.modal'))
  modal.hide()

  emit('change', new_test_case)
}

async function archiveTestCase(event: Event) {
  event.preventDefault()
  validations.clear()

  if (!confirm('确认归档？')) {
    return
  }

  try {
    const new_test_case = await new q.case.TestCaseReq.Destroy().setup(proxy, (req) => {
      req.interpolations.project_id = props.test_case.project_id
      req.interpolations.id = props.test_case.id
    }).perform()

    $(event.target).closest('.modal').modal('hide')
    emit('destroy', new_test_case)
  } catch (err) {
    if (validations.handleError(err)) {
      alert(JSON.stringify(validations.fullMessages, null, 2))
      return
    }

    throw err
  }
}
</script>

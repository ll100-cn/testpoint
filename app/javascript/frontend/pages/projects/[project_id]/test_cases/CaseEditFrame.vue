<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ test_case.title }}</h5>
        <a href="#" class="text-danger small" @click="archiveTestCase">归档</a>
      </div>
      <CaseForm :form="form" :validations="validations" :platform_repo="platform_repo" :label_repo="label_repo" @create="submitForm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models';
import * as requests from '@/lib/requests';
import $ from 'jquery';
import { PropType, getCurrentInstance, reactive, ref } from 'vue';

import { Validations } from "@/components/simple_form";
import CaseForm from './CaseForm.vue';
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

const form = ref({
  title: props.test_case.title,
  content: props.test_case.content,
  role_name: props.test_case.role_name,
  scene_name: props.test_case.scene_name,
  group_name: props.test_case.group_name,
  platform_ids: props.test_case.platform_ids,
  label_ids: props.test_case.label_ids
})

async function submitForm(event: Event) {
  event.preventDefault()
  validations.clear()

  const form_data = new FormData(event.target as HTMLFormElement)
  try {
    const new_test_case = await new requests.TestCaseReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = 1
      req.interpolations.id = props.test_case.id
    }).perform(form_data)

    $(event.target).closest('.modal').modal('hide')
    emit('change', new_test_case)
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

async function archiveTestCase(event: Event) {
  event.preventDefault()
  validations.clear()

  if (!confirm('确认归档？')) {
    return
  }

  try {
    const new_test_case = await new requests.TestCaseReq.Destroy().setup(proxy, (req) => {
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

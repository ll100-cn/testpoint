<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ test_case.title }}</h5>
        <a href="#" class="text-danger small" @click="archiveTestCase">归档</a>
      </div>
      <form @submit="submitForm">
        <div class="modal-body">
          <div class="alert alert-danger" role="alert" v-if="validations.isAvaliableInvalid()">
            <div v-for="message in validations.avaliableFullMessages()">
              {{ message }}
            </div>
          </div>
          <component :is="layouts.vertical_group" :validation="validations.disconnect('role_name')" label="角色" v-slot="slotProps">
            <component :is="forms.string" v-bind="{ ...slotProps, form }" />
          </component>

          <component :is="layouts.vertical_group" :validation="validations.disconnect('scene_name')" label="场景" v-slot="slotProps">
            <component :is="forms.string" v-bind="{ ...slotProps, form }" />
          </component>

          <component :is="layouts.vertical_group" :validation="validations.disconnect('group_name')" label="分组" v-slot="slotProps">
            <component :is="forms.string" v-bind="{ ...slotProps, form }" />
          </component>

          <component :is="layouts.vertical_group" :validation="validations.disconnect('title')" label="标题" v-slot="slotProps">
            <component :is="forms.string" v-bind="{ ...slotProps, form }" />
          </component>

          <component :is="layouts.vertical_group" :validation="validations.disconnect('content')" label="内容" v-slot="slotProps">
            <textarea class="form-control text optional markdown-field" name="content" id="test_case_content" v-model="form.content"></textarea>
          </component>

          <component :is="layouts.vertical_group" :validation="validations.disconnect('platform_ids')" label="平台" v-slot="slotProps">
            <component :is="forms.checkboxes" v-bind="{ ...slotProps, form, name: 'platform_ids[]', collection: platform_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
          </component>

          <component :is="layouts.vertical_group" :validation="validations.disconnect('label_ids')" label="标签" v-slot="slotProps">
            <component :is="forms.checkboxes" v-bind="{ ...slotProps, form, name: 'label_ids[]', collection: label_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
          </component>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">保存</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models';
import * as requests from '@/requests';
import { AxiosError } from 'axios';
import $ from 'jquery';
import { PropType, getCurrentInstance, ref, reactive } from 'vue';
import _ from "lodash"

import { Validations, layouts, forms } from "@/components/simple_form";
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

  const form_data = new FormData(event.target as HTMLFormElement)
  try {
    const new_test_case = await new requests.TestCaseUpdateRequest().setup(req => {
      req.interpolations.project_id = 1
      req.interpolations.id = props.test_case.id
    }).perform(proxy, form_data)

    $(event.target).closest('.modal').modal('hide')
    emit('change', new_test_case)
  } catch (err) {
    if (err instanceof requests.ErrorUnprocessableEntity) {
      validations.marge(err.validations, err.names)
      return
    }

    throw err
  }
}

async function archiveTestCase(event: Event) {
  event.preventDefault()

  if (!confirm('确认归档？')) {
    return
  }

  try {
    const new_test_case = await new requests.TestCaseDestroyRequest().setup(req => {
      req.interpolations.project_id = props.test_case.project_id
      req.interpolations.id = props.test_case.id
    }).perform(proxy)

    $(event.target).closest('.modal').modal('hide')
    emit('destroy', new_test_case)
  } catch (err) {
    if (err instanceof requests.ErrorUnprocessableEntity) {
      validations.marge(err.validations, err.names)
      alert(JSON.stringify(validations.fullMessages, null, 2))
      return
    }

    throw err
  }
}
</script>

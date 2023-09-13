<template>
  <div ref="modal" class="modal" tabindex="-1">
    <div v-if="state === 'pending'" class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">批量编辑</h5>
        </div>
        <form @submit="submitForm">
          <div class="modal-body">
            <FormErrorAlert :validations="validations" />

            <component :is="layouts.vertical_group" :validation="validations.disconnect('role_name')" label="角色" :disableds="form_disabled_mapping">
              <template #label-prepend="{ code }">
                <div class="form-check col-auto form-switch">
                  <input v-model="form_enabled_mapping[code]" class="form-check-input" type="checkbox" role="switch">
                </div>
              </template>
              <template #default="slotProps"><component :is="forms.string" v-bind="{ ...slotProps, form, name: 'role_name' }" /></template>
            </component>

            <component :is="layouts.vertical_group" :validation="validations.disconnect('scene_name')" label="场景" :disableds="form_disabled_mapping">
              <template #label-prepend="{ code }">
                <div class="form-check col-auto form-switch">
                  <input v-model="form_enabled_mapping[code]" class="form-check-input" type="checkbox" role="switch">
                </div>
              </template>
              <template #default="slotProps"><component :is="forms.string" v-bind="{ ...slotProps, form, name: 'scene_name' }" /></template>
            </component>

            <component :is="layouts.vertical_group" :validation="validations.disconnect('group_name')" label="分组" :disableds="form_disabled_mapping">
              <template #label-prepend="{ code }">
                <div class="form-check col-auto form-switch">
                  <input v-model="form_enabled_mapping[code]" class="form-check-input" type="checkbox" role="switch">
                </div>
              </template>
              <template #default="slotProps"><component :is="forms.string" v-bind="{ ...slotProps, form, name: 'group_name' }" /></template>
            </component>

            <component :is="layouts.vertical_group" :validation="validations.disconnect('title')" label="标题" :disableds="form_disabled_mapping">
              <template #label-prepend="{ code }">
                <div class="form-check col-auto form-switch">
                  <input v-model="form_enabled_mapping[code]" class="form-check-input" type="checkbox" role="switch">
                </div>
              </template>
              <template #default="slotProps"><component :is="forms.string" v-bind="{ ...slotProps, form, name: 'title' }" /></template>
            </component>

            <component :is="layouts.vertical_group" :validation="validations.disconnect('content')" label="内容" :disableds="form_disabled_mapping">
              <template #label-prepend="{ code }">
                <div class="form-check col-auto form-switch">
                  <input v-model="form_enabled_mapping[code]" class="form-check-input" type="checkbox" role="switch">
                </div>
              </template>
              <template #default="slotProps"><component :is="forms.string" v-bind="{ ...slotProps, form, name: 'content' }" /></template>
            </component>

            <component :is="layouts.vertical_group" :validation="validations.disconnect('platform_ids')" label="平台" :disableds="form_disabled_mapping">
              <template #label-prepend="{ code }">
                <div class="form-check col-auto form-switch">
                  <input v-model="form_enabled_mapping[code]" class="form-check-input" type="checkbox" role="switch">
                </div>
              </template>
              <template #default="slotProps"><component :is="forms.checkboxes" v-bind="{ ...slotProps, form, name: 'platform_ids[]', collection: platform_repo.values(), labelMethod: 'name', valueMethod: 'id' }" /></template>
            </component>

            <component :is="layouts.vertical_group" :validation="validations.disconnect('label_ids')" label="标签" :disableds="form_disabled_mapping">
              <template #label-prepend="{ code }">
                <div class="form-check col-auto form-switch">
                  <input v-model="form_enabled_mapping[code]" class="form-check-input" type="checkbox" role="switch">
                </div>
              </template>
              <template #default="slotProps"><component :is="forms.checkboxes" v-bind="{ ...slotProps, form, name: 'label_ids[]', collection: label_repo.values(), labelMethod: 'name', valueMethod: 'id' }" /></template>
            </component>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="state === 'submiting'" class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">提交中</h5>
        </div>
        <div class="modal-body">
          <h3>表单提交中</h3>
        </div>
      </div>
    </div>

    <div v-if="state === 'submitted'" class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">提交结束, 错误数 {{ result.filter((it) => { return it.error != null }).length }} 个</h5>
        </div>
        <div class="modal-body">
          <h3>表单提交中</h3>
          <template v-for="info in result" :key="info">
            <div>
              <span>名称: {{ info.test_case.title }}</span>
              <span v-if="info.error" class="text-danger">
                错误: {{ info.error }}
              </span>
              <span v-else class="text-success">
                成功
              </span>
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="state = 'pending'">重新编辑</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models';
import * as requests from '@/lib/requests';
import { Modal } from 'bootstrap';
import _ from 'lodash';
import { PropType, computed, getCurrentInstance, nextTick, reactive, ref } from 'vue';

import FormErrorAlert from '@/components/FormErrorAlert.vue';
import { Validations, forms, layouts } from "@/components/simple_form";
const validations = reactive<Validations>(new Validations())

const { proxy } = getCurrentInstance()
const state = ref('pending') // [ pending, submiting, submited ]

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
  (e: 'batch_change'): void
}>()

const modal = ref<InstanceType<typeof HTMLElement>>()
const result = ref<{
  test_case: TestCase,
  error: string | null
}[]>([])

async function submitForm(event: Event) {
  event.preventDefault()

  result.value = []
  state.value = 'submiting'
  validations.clear()

  const form_data = new FormData(event.target as HTMLFormElement)

  for (const test_case of test_cases.value) {
    const info: { test_case: TestCase, error: string | null } = {
      test_case: test_case,
      error: null
    }

    try {
      await new requests.TestCaseReq.Update().setup(proxy, (req) => {
        req.interpolations.project_id = test_case.project_id
        req.interpolations.id = test_case.id
      }).perform(form_data)
    } catch (err) {
      if (validations.handleError(err)) {
        const errors_string = JSON.stringify(validations.fullMessages, null, 2)

        info.error = errors_string
        result.value.push(info)
        state.value = 'submitted'
        return
      }

      throw err
    }

    result.value.push(info)
  }
  state.value = 'submitted'
  emit('batch_change')
}

const form = ref({
  title: null as string | null | undefined,
  content: null as string | null | undefined,
  role_name: null as string | null | undefined,
  scene_name: null as string | null | undefined,
  group_name: null as string | null | undefined,
  platform_ids: [] as number[] | null | undefined,
  label_ids: null as number[] | null | undefined
})

const form_enabled_mapping = ref({
  title: false,
  content: false,
  role_name: false,
  scene_name: false,
  group_name: false,
  platform_ids: false,
  label_ids: false
})

const form_disabled_mapping = computed(() => {
  return _.mapValues(form_enabled_mapping.value, (value) => !value)
})

const test_cases = ref<TestCase[]>([])
function show(all_test_cases: TestCase[]) {
  test_cases.value = all_test_cases

  resetForm()

  nextTick(() => {
    const $modal = Modal.getOrCreateInstance(modal.value)
    $modal.show()
  })
}

function resetForm() {
  for (let i = 0; i < test_cases.value.length; i++) {
    const test_case = test_cases.value[i]
    for (const key in form.value) {
      if (i === 0) {
        form.value[key] = test_case[key]
        continue
      }

      if (form.value[key] === undefined) {
        continue
      }

      if (!_.isEqual(test_case[key], form.value[key])) {
        form.value[key] = undefined
        continue
      }
    }
  }

  if (form.value.platform_ids === undefined) {
    form.value.platform_ids = []
  }
  if (form.value.label_ids === undefined) {
    form.value.label_ids = []
  }

  for (const key in form_enabled_mapping.value) {
    form_enabled_mapping.value[key] = false
  }
}

defineExpose({
  show
})

</script>

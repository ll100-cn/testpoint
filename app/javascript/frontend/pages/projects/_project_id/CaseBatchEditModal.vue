<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-lg" v-if="state === 'pending'">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">批量编辑</h5>
        </div>
        <form @submit="submitForm">
          <div class="modal-body">
            <div class="row mb-3 string required test_case_title ms-0">
              <label class="col-form-label string required col-sm-2 text-end" for="test_case_title">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form_enabled_mapping.title" >
                  标题
                </div>
              </label>
              <div class="col">
                <input class="form-control string required" type="text" name="title" id="test_case_title"
                  v-model="form.title" :disabled="!form_enabled_mapping.title" />
              </div>
            </div>

            <div class="row mb-3 string required test_case_title ms-0">
              <label class="col-form-label string required col-sm-2 text-end" for="test_case_title">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form_enabled_mapping.role_name" >
                  角色
                </div>
              </label>
              <div class="col">
                <input class="form-control string required" type="text" name="role_name" id="test_case_title"
                  v-model="form.role_name" :disabled="!form_enabled_mapping.role_name" />
              </div>
            </div>

            <div class="row mb-3 string required test_case_title ms-0">
              <label class="col-form-label string required col-sm-2 text-end" for="test_case_title">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form_enabled_mapping.scene_name" >
                  角色
                </div>
              </label>
              <div class="col">
                <input class="form-control string required" type="text" name="scene_name" id="test_case_title"
                  v-model="form.scene_name" :disabled="!form_enabled_mapping.scene_name" />
              </div>
            </div>

            <div class="row mb-3 text optional test_case_content ms-0">
              <label class="col-form-label text optional col-sm-2 text-end" for="test_case_content">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form_enabled_mapping.content" >
                  内容
                </div>
              </label>
              <div class="col">
                <textarea class="form-control text optional markdown-field" name="content" id="test_case_content"
                  v-model="form.content" :disabled="!form_enabled_mapping.content"></textarea>
              </div>
            </div>

            <div class="row check_boxes required test_case_platform_ids ms-0">
              <label class="col-form-label check_boxes required col-sm-2 text-end">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form_enabled_mapping.platform_ids" >
                  平台
                </div>
              </label>
              <div class="col">
                <input type="hidden" value="" name="platform_ids[]" :disabled="!form_enabled_mapping.platform_ids" />
                <div class="form-check form-check-inline" v-for="platform in platform_repo.values()">
                  <label class="form-check-label collection_check_boxes">
                    <input class="form-check-input check_boxes required" type="checkbox" :value="platform.id"
                      v-model="form.platform_ids" name="platform_ids[]" :disabled="!form_enabled_mapping.platform_ids" />
                      {{ platform.name }}
                  </label>
                </div>
              </div>
            </div>


            <div class="row check_boxes optional test_case_label_ids ms-0">
              <label class="col-form-label check_boxes optional col-sm-2 text-end">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" v-model="form_enabled_mapping.label_ids" >
                  标签
                </div>
              </label>
              <div class="col">
                <input type="hidden" value="" name="label_ids[]" :disabled="!form_enabled_mapping.label_ids" />
                <div class="form-check form-check-inline" v-for="label in label_repo.values()">
                  <label class="form-check-label collection_check_boxes">
                    <input class="form-check-input check_boxes optional" type="checkbox" :value="label.id"
                      name="label_ids[]" :disabled="!form_enabled_mapping.label_ids" />
                    {{ label.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </form>
      </div>
    </div>

    <div class="modal-dialog modal-lg" v-if="state === 'submiting'">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">提交中</h5>
        </div>
        <div class="modal-body">
          <h3>表单提交中</h3>
        </div>
      </div>
    </div>

    <div class="modal-dialog modal-lg" v-if="state === 'submitted'">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">提交结束, 错误数 {{ result.filter((it) => { return it.error != null }).length }} 个</h5>
        </div>
        <div class="modal-body">
          <h3>表单提交中</h3>
          <template v-for="info in result">
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
import { PropType, getCurrentInstance, nextTick, ref } from 'vue';
import * as requests from '@/requests'
import $ from 'jquery'
import axios from '@/initializers/axios';
import { AxiosError } from 'axios';
import { Modal } from 'bootstrap';
import _ from 'lodash';

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

  const form_data = new FormData(event.target as HTMLFormElement)

  for (const test_case of test_cases.value) {
    let info: { test_case: TestCase, error: string | null } = {
      test_case: test_case,
      error: null
    }

    try {
      const new_test_case = await new requests.TestCaseUpdateRequest().setup(req => {
        req.interpolations.project_id = test_case.project_id
        req.interpolations.id = test_case.id
      }).perform(proxy, form_data)
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status == 422) {
        const errors = err.response.data.errors
        const errors_string = JSON.stringify(errors, null, 2)

        info.error = errors_string
        result.value.push(info)
        state.value = 'submitted'
        break
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
  platform_ids: null as number[] | null | undefined,
  label_ids: null as number[] | null | undefined
})

const form_enabled_mapping = ref({
  title: false,
  content: false,
  role_name: false,
  scene_name: false,
  platform_ids: false,
  label_ids: false
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

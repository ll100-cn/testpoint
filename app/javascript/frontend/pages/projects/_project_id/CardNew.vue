<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新建案例</h5>
        </div>
        <form @submit="submitForm">
          <div class="modal-body">
            <div class="row mb-3 string required test_case_title ms-0">
              <label class="col-form-label string required col-sm-2 text-end" for="test_case_title">角色</label>
              <div class="col">
                <input class="form-control string required" type="text" name="role_name" id="test_case_title" v-model="form.role_name" />
              </div>
            </div>

            <div class="row mb-3 string required test_case_title ms-0">
              <label class="col-form-label string required col-sm-2 text-end" for="test_case_title">场景</label>
              <div class="col">
                <input class="form-control string required" type="text" name="scene_name" id="test_case_title" v-model="form.scene_name" />
              </div>
            </div>

            <div class="row mb-3 string required test_case_title ms-0">
              <label class="col-form-label string required col-sm-2 text-end" for="test_case_title">分组</label>
              <div class="col">
                <input class="form-control string required" type="text" name="group_name" id="test_case_title" v-model="form.group_name" />
              </div>
            </div>

            <div class="row mb-3 string required test_case_title ms-0">
                <label class="col-form-label string required col-sm-2 text-end" for="test_case_title">标题</label>
                <div class="col">
                  <input class="form-control string required" type="text" name="title" id="test_case_title" v-model="form.title" />
                </div>
              </div>

            <div class="row mb-3 text optional test_case_content ms-0">
              <label class="col-form-label text optional col-sm-2 text-end" for="test_case_content">内容</label>
              <div class="col">
                <textarea class="form-control text optional markdown-field" name="content" id="test_case_content" v-model="form.content"></textarea>
              </div>
            </div>

            <div class="row check_boxes required test_case_platform_ids ms-0">
              <label class="col-form-label check_boxes required col-sm-2 text-end">
                  平台
              </label>
              <div class="col">
                <input type="hidden" value="" name="platform_ids[]" />
                <div class="form-check form-check-inline" v-for="platform in platform_repo.values()">
                  <label class="form-check-label collection_check_boxes" >
                    <input class="form-check-input check_boxes required" type="checkbox" :value="platform.id" v-model="form.platform_ids" name="platform_ids[]" />
                    {{ platform.name }}
                  </label>
                </div>
              </div>
            </div>


            <div class="row check_boxes optional test_case_label_ids ms-0">
              <label class="col-form-label check_boxes optional col-sm-2 text-end">标签</label>
              <div class="col">
                <input type="hidden" value="" name="label_ids[]" />
                <div class="form-check form-check-inline" v-for="label in label_repo.values()">
                  <label class="form-check-label collection_check_boxes">
                    <input class="form-check-input check_boxes optional" type="checkbox" :value="label.id" name="label_ids[]" />
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
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios';
import { getCurrentInstance, nextTick, ref } from 'vue';
import * as requests from '@/requests'
import { Modal } from 'bootstrap';
import { TestCase } from '@/models';

const props = defineProps({
  platform_repo: {
    type: Object,
    required: true,
  },
  label_repo: {
    type: Object,
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
    if (err instanceof AxiosError && err.response?.status == 422) {
      const errors = err.response.data.errors
      alert(JSON.stringify(errors, null, 2))
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

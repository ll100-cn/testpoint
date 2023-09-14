<template>
  <div v-if="test" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增计划</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <FormHorizontal :validations="validations" @submit="onSubmit">
          <div class="modal-body">
            <Fields :validations="validations" :form="form" :platforms="platforms" :test_case_stats="test_case_stats" />
          </div>
          <div class="modal-footer">
            <SubmitButton submit_text="新增计划" :func="onSubmit" />
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          </div>
        </FormHorizontal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validations } from "@/components/simple_form"
import { getCurrentInstance, nextTick, reactive, ref } from 'vue'
import * as utils from "@/lib/utils"
import { Plan, Platform, TestCaseStat } from '@/models'
import * as requests from '@/lib/requests'
import { Modal } from 'bootstrap'
import _ from 'lodash'
import SubmitButton from "@/components/SubmitButton.vue"
import Fields from "./Fields.vue"
import FormHorizontal from "@/components/FormHorizontal.vue"

const { proxy } = getCurrentInstance()

const props = withDefaults(defineProps<{
  platforms: Platform[]
  test_case_stats: TestCaseStat[]
}>(), {
  platforms: () => [],
})

const emit = defineEmits<{
  created: [plan: Plan]
}>()

const validations = reactive<Validations>(new Validations())
const modal = ref<InstanceType<typeof HTMLElement>>()
const mode = ref('show')
const test = ref(true)

const form = ref({
  title: `Test Plan: ${utils.humanize(new Date(), "YYYY-MM-DD")}` as string | null | undefined,
  platform_id: _.first(props.platforms).id as number | null | undefined,
  milestone_id: null as number | null | undefined,
  role_names: [],
})
const _form = _.cloneDeep(form.value)

function resetForm() {
  form.value = _form
}

async function show() {
  mode.value = 'show'

  nextTick(() => {
    const $modal = ref(Modal.getOrCreateInstance(modal.value))
    $modal.value.show()
  })
}

async function hidden() {
  mode.value = 'hide'

  nextTick(() => {
    const $modal = ref(Modal.getOrCreateInstance(modal.value))
    $modal.value.hide()
  })
}

async function onSubmit() {
  validations.clear()
  try {
    const plan = await new requests.PlanReq.Create().setup(proxy, (req) => {
      req.interpolations.project_id = 1
    }).perform(form.value)

    hidden()
    emit('created', plan)
    resetForm()
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

defineExpose({
  show,
  hidden
})
</script>

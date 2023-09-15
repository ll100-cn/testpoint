<template>
  <div v-if="test" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增计划</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
          <div class="modal-body">
            <Fields :platforms="platforms" :test_case_stats="test_case_stats" />
          </div>
          <div class="modal-footer">
            <layouts.submit>新增计划</layouts.submit>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          </div>
        </FormHorizontal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormHorizontal from "@/components/FormHorizontal.vue"
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as requests from '@/lib/requests'
import * as utils from "@/lib/utils"
import { Plan, Platform, TestCaseStat } from '@/models'
import { Modal } from 'bootstrap'
import _ from 'lodash'
import { getCurrentInstance, nextTick, ref } from 'vue'
import Fields from "./Fields.vue"

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

const modal = ref<InstanceType<typeof HTMLElement>>()
const mode = ref('show')
const test = ref(true)

const former = Former.build({
  title: `Test Plan: ${utils.humanize(new Date(), "YYYY-MM-DD")}` as string | null | undefined,
  platform_id: _.first(props.platforms).id as number | null | undefined,
  milestone_id: null as number | null | undefined,
  role_names: [],
})

const _form = _.cloneDeep(former.form)

former.perform = async function() {
  const plan = await new requests.PlanReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = 1
  }).perform(this.form)

  hidden()
  emit('created', plan)
  resetForm()
}

function resetForm() {
  former.form = _form
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

defineExpose({
  show,
  hidden
})
</script>

<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增计划</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <form @submit="onSubmit">
          <div class="modal-body">
            <PlanForm :validations="validations" :form="form" :platforms="platforms" />
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span v-if="submitting"><i class="spinner-border spinner-border-sm" />提交中，请稍等</span>
              <span v-else>新增计划</span>
            </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validations } from "@/components/simple_form"
import { getCurrentInstance, nextTick, reactive, ref } from 'vue'

import * as utils from "@/lib/utils"
import { Plan, Platform } from '@/models'
import * as requests from '@/requests'
import { Modal } from 'bootstrap'
import _ from 'lodash'
import PlanForm from "./PlanForm.vue"

const { proxy } = getCurrentInstance()

const props = defineProps({
  platforms: Array<Platform>,
})

const emit = defineEmits<{
  (e: 'created', plan: Plan): void,
}>()

const validations = reactive<Validations>(new Validations())
const modal = ref<InstanceType<typeof HTMLElement>>()
const mode = ref('show')
const submitting = ref(false)

const form = ref({
  title: `Test Plan: ${utils.humanize(new Date(), "YYYY-MM-DD")}` as string | null | undefined,
  platform_id: _.first(props.platforms).id as number | null | undefined,
  milestone_id: null as number | null | undefined,
})

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

async function onSubmit(event: Event) {
  event.preventDefault()
  validations.clear()
  submitting.value = true
  try {
    const plan = await new requests.PlanCreate().setup(proxy, (req) => {
      req.interpolations.project_id = 1
    }).perform(form.value)

    hidden()
    emit('created', plan)
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  } finally {
    submitting.value = false
  }
}

defineExpose({
  show,
  hidden
})
</script>

<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ plan.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <form @submit="onSubmit">
          <div class="modal-body">
            <FormExtraErrorAlert :validations="validations" />

            <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('title')" label="标题">
              <forms.string v-bind="{ ...slotProps, form }" />
            </layouts.horizontal_group>
            <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('release_revision')" label="版本构建号" hint="*选填，仅用于备注">
              <forms.string v-bind="{ ...slotProps, form }" />
            </layouts.horizontal_group>

            <hr>
            <h5>待测用例</h5>
            <p class="text-muted small"><span class="text-danger">{{ upshots_state_counts['failure'] || 0 }}</span> 个失败用例需要重新测试</p>
            <p class="text-muted small"><span class="text-body">{{ upshots_state_counts['pending'] || 0 }}</span> 个未测试用例, 将添加到本轮</p>
            <p class="text-muted small"><span class="text-success">{{ upshots_state_counts['pass'] || 0 }}</span> 个成功用例将不显示</p>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success" :disabled="submitting">
              <span v-if="submitting"><i class="spinner-border spinner-border-sm" />提交中，请稍等</span>
              <span else>确定进入下一轮</span>
            </button>
            <button class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" @click.prevent>返回</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validations, forms, layouts } from "@/components/simple_form"
import { PropType, getCurrentInstance, nextTick, reactive, ref, computed } from 'vue'
import _ from 'lodash'

import FormExtraErrorAlert from "@/components/FormExtraErrorAlert.vue"
import { Phase, PhaseInfo, Plan, TaskUpshotInfo } from '@/models'
import * as requests from '@/requests'
import { Modal } from 'bootstrap'
import { useRoute } from "vue-router"

const { proxy } = getCurrentInstance()
const route = useRoute()

const project_id = _.toNumber(route.params.project_id)
const plan_id = _.toNumber(route.params.id)

const props = defineProps({
  plan: { type: Object as PropType<Plan>, requird: true },
  phase_infos: { type: Array as PropType<PhaseInfo[]>, requird: true },
  task_upshot_infos: { type: Array as PropType<TaskUpshotInfo[]>, requird: true }
})

const emit = defineEmits<{
  (e: 'created', phase: Phase): void,
}>()

const validations = reactive<Validations>(new Validations())
const modal = ref<InstanceType<typeof HTMLElement>>()
const mode = ref('show')
const submitting = ref(false)

const upshots_state_counts = computed(() => {
  return _.last(props.phase_infos).upshots_state_counts
})

const form = ref({
  title: `第 ${props.phase_infos.length + 1 ?? 1} 轮`,
  release_revision: ""
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
    const phase = await new requests.PlanPhaseCreate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.plan_id = plan_id
    }).perform(form.value)

    hidden()
    emit('created', phase)
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

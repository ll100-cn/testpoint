<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ plan.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
          <div class="modal-body">
            <FormErrorAlert />

            <div class="row gy-3">
              <layouts.group code="title" label="标题"><controls.string /></layouts.group>
              <layouts.group code="release_revision" label="版本构建号" hint="*选填，仅用于备注"><controls.string /></layouts.group>
            </div>

            <hr>
            <h5>待测用例</h5>
            <p class="text-muted small"><span class="text-danger">{{ upshots_state_counts['failure'] ?? 0 }}</span> 个失败用例需要重新测试</p>
            <p class="text-muted small"><span class="text-body">{{ upshots_state_counts['pending'] ?? 0 }}</span> 个未测试用例, 将添加到本轮</p>
            <p class="text-muted small"><span class="text-success">{{ upshots_state_counts['pass'] ?? 0 }}</span> 个成功用例将不显示</p>
          </div>
          <div class="modal-footer x-spacer-2">
            <layouts.submit>确定进入下一轮</layouts.submit>
            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal" aria-label="Close" @click.prevent>返回</button>
          </div>
        </layouts.form_vertical>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as q from '@/lib/requests'
import { Phase, PhaseInfo, Plan, TaskUpshotInfo } from '@/models'
import { Modal } from 'bootstrap'
import _ from 'lodash'
import { PropType, computed, getCurrentInstance, nextTick, ref } from 'vue'
import { useRoute } from "vue-router"

const { proxy } = getCurrentInstance()
const route = useRoute()
const params = route.params as any

const props = defineProps({
  plan: { type: Object as PropType<Plan>, requird: true },
  phase_infos: { type: Array as PropType<PhaseInfo[]>, requird: true },
  task_upshot_infos: { type: Array as PropType<TaskUpshotInfo[]>, requird: true }
})

const emit = defineEmits<{
  (e: 'created', phase: Phase): void,
}>()

const modal = ref<InstanceType<typeof HTMLElement>>()
const mode = ref('show')

const upshots_state_counts = computed(() => {
  return _.last(props.phase_infos).upshots_state_counts
})

const former = Former.build({
  title: `第 ${props.phase_infos.length + 1 ?? 1} 轮`,
  release_revision: ""
})

former.perform = async function() {
  const phase = await new q.test.PlanPhaseReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
    req.interpolations.plan_id = params.plan_id
  }).perform(this.form)

  hidden()
  emit('created', phase)
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

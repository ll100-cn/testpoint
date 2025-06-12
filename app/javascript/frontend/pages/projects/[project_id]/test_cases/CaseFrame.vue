<template>
    <template v-if="test_case">
      <CardShow v-if="mode == 'show'" :test_case="test_case" :history="history" @change-mode="onModeChange" />
      <CaseEditFrame
        v-if="mode == 'edit'" :test_case="test_case"
        :platform_repo="platform_repo"
        :label_repo="label_repo"
        @destroy="emit('destroy', $event)"
        @change="emit('change', $event)" />
    </template>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models';
import * as q from '@/requests';
import { type PropType, getCurrentInstance, nextTick, ref } from 'vue';
import CardShow from './CardShow.vue';
import CaseEditFrame from './CaseEditFrame.vue';
import { useQueryLine } from '@/lib/useQueryLine';

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

const line = useQueryLine()

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
}>()

const test_case = ref<TestCase | null>()
const history = ref<TestCase[]>([])
const mode = ref('show')

const modal = ref<InstanceType<typeof HTMLElement>>()

async function show(a_test_case: TestCase) {
  mode.value = 'show'
  test_case.value = a_test_case

  const { data: history_page, suspense } = line.request(q.case.test_cases.History(), (req, it) => {
    req.interpolations.project_id = a_test_case.project_id
    req.interpolations.id = a_test_case.id
    return it.useQuery(req.toQueryConfig())
  })
  await suspense()
  history.value = history_page.value.list.map(it => it.test_case)

  nextTick(() => {
    const $modal = Modal.getOrCreateInstance(modal.value)
    $modal.show()
  })
}

defineExpose({
  show
})

function onModeChange(new_mode: string) {
  mode.value = new_mode
}
</script>

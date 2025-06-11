<template>
  <DialogContent class="max-w-4xl" v-if="!loading">
    <DialogHeader>
      <DialogTitle>批量编辑</DialogTitle>
    </DialogHeader>

    <template v-if="state === 'pending'">
      <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
        <div>
          <FormErrorAlert />

          <div class="space-y-3">
            <SwitchFormGroup code="role_name" label="角色" :enableds="form_enabled_mapping" :former="former">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="scene_name" label="场景" :enableds="form_enabled_mapping" :former="former">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="group_name" label="分组" :enableds="form_enabled_mapping" :former="former">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="title" label="标题" :enableds="form_enabled_mapping" :former="former">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="content" label="内容" :enableds="form_enabled_mapping" :former="former">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="platform_ids" label="平台" :enableds="form_enabled_mapping" :former="former">
              <controls.CheckboxCollection :collection="platform_repo.values()" item-label="name" item-value="id" />
            </SwitchFormGroup>

            <SwitchFormGroup code="label_ids" label="标签" :enableds="form_enabled_mapping" :former="former">
              <controls.CheckboxCollection :collection="label_repo.values()" item-label="name" item-value="id" />
            </SwitchFormGroup>

            <!-- <SwitchFormGroup code="scene_name" label="场景" :enableds="form_enabled_mapping">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="group_name" label="分组" :enableds="form_enabled_mapping">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="title" label="标题" :enableds="form_enabled_mapping">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="content" label="内容" :enableds="form_enabled_mapping">
              <controls.String />
            </SwitchFormGroup>

            <SwitchFormGroup code="platform_ids" label="平台" :enableds="form_enabled_mapping">
              <controls.CheckboxCollection v-bind="{ collection: platform_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
            </SwitchFormGroup>

            <SwitchFormGroup code="label_ids" label="标签" :enableds="form_enabled_mapping">
              <controls.CheckboxCollection v-bind="{ collection: label_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
            </SwitchFormGroup> -->
          </div>

        </div>

        <DialogFooter>
          <DialogClose><Button type="button" class="btn btn-secondary">Close</Button></DialogClose>
          <Button>保存</Button>
        </DialogFooter>
      </Form>
    </template>

    <template v-if="state === 'submitting'">
      <div>
        <h3>表单提交中</h3>
      </div>
    </template>

    <template v-if="state === 'submitted'">
      <div>
        <h5>提交结束, 错误数 {{ result.filter((it) => { return it.error != null }).length }} 个</h5>
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
      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">Close</Button></DialogClose>
        <Button type="button" @click.prevent="state = 'pending'">重新编辑</Button>
      </DialogFooter>
    </template>
  </DialogContent>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import * as q from '@/requests'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'
import _ from 'lodash'
import { nextTick, reactive, ref } from 'vue'
import SwitchFormGroup from './SwitchFormGroup.vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import Button from '$ui/button/Button.vue'
import { Former, GenericForm, GenericFormGroup, Validator } from '$ui/simple_form'
import * as controls from '@/components/controls'
import { useQueryLine } from '@/lib/useQueryLine'

const validations = reactive(new Validator())
const line = useQueryLine()
const state = ref('pending') // [ pending, submitting, submited ]

const props = defineProps<{
  platform_repo: EntityRepo<Platform>,
  label_repo: EntityRepo<TestCaseLabel>,
}>()

const emit = defineEmits<{
  updated: []
}>()

const result = ref<{
  test_case: TestCase,
  error: string | null
}[]>([])

const former = Former.build({
  title: null as string | null | undefined,
  content: null as string | null | undefined,
  role_name: null as string | null | undefined,
  scene_name: null as string | null | undefined,
  group_name: null as string | null | undefined,
  platform_ids: [] as number[] | null | undefined,
  label_ids: null as number[] | null | undefined
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_test_case_action } = line.request(q.case.test_cases.Update, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  result.value = []
  state.value = 'submitting'
  validations.clear()

  const form_data = _.pickBy(former.form, (value, key) => {
    return form_enabled_mapping.value[key]
  })

  for (const test_case of test_cases.value) {
    const info: { test_case: TestCase, error: string | null } = {
      test_case: test_case,
      error: null
    }

    try {
      await update_test_case_action({
        interpolations: { project_id: test_case.project_id, id: test_case.id },
        body: form_data
      })
    } catch (err) {
      validations.processError(err)

      const errors_string = JSON.stringify(validations.errorMessages([]), null, 2)
      info.error = errors_string
      result.value.push(info)
      state.value = 'submitted'
    }

    result.value.push(info)
  }
  state.value = 'submitted'
  emit('updated')
}

const form_enabled_mapping = ref({
  title: false,
  content: false,
  role_name: false,
  scene_name: false,
  group_name: false,
  platform_ids: false,
  label_ids: false
})


const test_cases = ref([] as TestCase[])

function resetForm() {
  for (let i = 0; i < test_cases.value.length; i++) {
    const test_case = test_cases.value[i]
    for (const key in former.form) {
      if (i === 0) {
        former.form[key] = test_case[key]
        continue
      }

      if (former.form[key] === undefined) {
        continue
      }

      if (!_.isEqual(test_case[key], former.form[key])) {
        former.form[key] = undefined
        continue
      }
    }
  }

  if (former.form.platform_ids === undefined) {
    former.form.platform_ids = []
  }
  if (former.form.label_ids === undefined) {
    former.form.label_ids = []
  }

  for (const key in form_enabled_mapping.value) {
    form_enabled_mapping.value[key] = false
  }
}

const loading = ref(true)
function reset(a_test_cases: TestCase[]) {
  loading.value = true
  test_cases.value = a_test_cases

  resetForm()

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })

</script>

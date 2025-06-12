<template>
  <DialogContent class="max-w-4xl" :closeable="false">
    <DialogHeader>
      <DialogTitle>新建需求板</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="title" label="名称">
          <controls.String />
        </FormGroup>
        <FormGroup path="main_axle" label="主轴">
          <controls.Select :options="STORYBOARD_MAIN_AXLE">
            <option v-for="option in STORYBOARD_MAIN_AXLE" :value="option.value">{{ option.label }}</option>
          </controls.Select>
        </FormGroup>
        <FormGroup path="description" label="描述">
          <controls.Markdown />
        </FormGroup>
      </div>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>新增需求板</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement, Storyboard } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { STORYBOARD_MAIN_AXLE } from '@/constants'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const params = route.params as any
const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<{
  created: [ Storyboard ]
}>()

const props = defineProps<{
  platforms: Platform[],
  storyboard_id: number,
}>()

const former = Former.build({
  title: "",
  description: "",
  main_axle: STORYBOARD_MAIN_AXLE[0].value,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_storyboard_action } = line.request(q.project.storyboards.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_storyboard_box = await create_storyboard_action({
    interpolations: { project_id: params.project_id },
    body: former.form,
  })

  emit('created', a_storyboard_box.storyboard)
  open.value = false
}

const loading = ref(true)
async function reset() {
  loading.value = false
}

defineExpose({
  reset
})
</script>

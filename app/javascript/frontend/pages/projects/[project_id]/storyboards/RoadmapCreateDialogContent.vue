<template>
  <DialogContent class="max-w-4xl" :closeable="false">
    <DialogHeader>
      <DialogTitle>新建线路图</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="title" label="名称">
          <controls.String />
        </FormGroup>
      </div>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>新增线路图</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import type { RoadmapFrameEmits } from '@/components/RoadmapFrame'
import { useQueryLine } from '@/lib/useQueryLine'
import { EntityRepo, Platform, Requirement, Storyboard, Roadmap } from '@/models'
import * as q from '@/requests'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const params = route.params as any
const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<RoadmapFrameEmits>()

const former = Former.build({
  title: "",
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_roadmap_action } = line.request(q.project.roadmaps.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const { roadmap } = await create_roadmap_action({
    interpolations: { project_id: params.project_id },
    body: former.form
  })

  emit('created', roadmap)
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

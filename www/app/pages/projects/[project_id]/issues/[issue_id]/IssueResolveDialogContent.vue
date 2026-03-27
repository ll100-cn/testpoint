<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>确认</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      确认后将归档该问题, 无法编辑, 是否确认问题已解决？

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>确认</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import type { IssueFrameEmits } from '@/components/IssueFrame'
import { useQueryLine } from '@/lib/useQueryLine'
import { type IssueBox } from "@/models"
import * as q from '@/requests'
import { ref } from "vue"

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<IssueFrameEmits>()

const props = defineProps<{
  issue_box: IssueBox
}>()

const former = Former.build({
  content: "",
  attachment_ids: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: resolve_issue_action } = line.request(q.bug.issues.Resolve('+info'), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_issue_box = await resolve_issue_action({
    interpolations: {
      project_id: props.issue_box.issue.project_id,
      issue_id: props.issue_box.issue.id
    },
    body: {
      action: 'resolve',
      comment_attributes: former.form
    }
  })

  emit("updated", a_issue_box)
  open.value = false
}

const loading = ref(true)

function reset() {
  loading.value = false
}

function confirm() {
  former.perform()
}

defineExpose({ reset, confirm })
</script>

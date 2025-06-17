<template>
  <div>
    <div class="flex mb-2">
      <span class="text-sm text-muted">{{ title }}</span>
      <span class="ms-auto" v-if="editable">
        <a href="#" @click.prevent="switchMode('edit')" v-if="mode != 'edit'"><i class="far fa-edit"></i></a>
        <a href="#" @click.prevent="switchMode('show')" v-else><i class="far fa-times text-muted"></i></a>
      </span>
    </div>

    <div v-if="mode == 'edit'">
      <Form preset="vertical" v-bind="{ former }" @submit.prevent="onSubmit" size="sm">
        <div class="mb-2">
          <slot name="editable" />
        </div>

        <div class="space-x-3">
          <Button size="sm">更新</Button>
          <Button variant="secondary" size="sm" type="button" @click.prevent="mode = 'show'">取消</Button>
        </div>
      </Form>
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { type IssueBox } from "@/models"
import { ref } from "vue"

const props = withDefaults(defineProps<{
  code: string
  title: string
  issue_box: IssueBox
  former: Former<any>
  editable?: boolean
}>(), {
  editable: true
})

const mode = ref('show' as 'show' | 'edit')
const Form = GenericForm<typeof props.former.form>
const FormGroup = GenericFormGroup<typeof props.former.form>

async function onSubmit() {
  await props.former.perform(props.code)
  mode.value = 'show'
}

function switchMode(a_mode: 'show' | 'edit') {
  if (a_mode == 'edit') {
    props.former.form['state'] = props.issue_box.issue.state
    props.former.form['priority'] = props.issue_box.issue.priority
    props.former.form['creator_id'] = props.issue_box.issue.creator_id
    props.former.form['assignee_id'] = props.issue_box.issue.assignee_id
    props.former.form['category_id'] = props.issue_box.issue.category_id
    props.former.form['milestone_id'] = props.issue_box.issue.milestone_id
  }
  console.log('former')

  mode.value = a_mode
}
</script>

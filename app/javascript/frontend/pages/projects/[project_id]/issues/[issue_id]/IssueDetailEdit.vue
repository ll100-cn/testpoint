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
          <Button variant="secondary" size="sm" type="button" @click="mode = 'show'">取消</Button>
        </div>
      </Form>
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'
import { IssueInfo } from "@/models"
import { ref } from "vue"

const props = withDefaults(defineProps<{
  code: string
  title: string
  issue_info: IssueInfo
  former: Former<any>
  editable?: boolean
}>(), {
  editable: true
})

const mode = ref('show' as 'show' | 'edit')
const { Form, FormGroup } = FormFactory<typeof props.former.form>()

async function onSubmit() {
  await props.former.perform(props.code)
  mode.value = 'show'
}

function switchMode(a_mode: 'show' | 'edit') {
  if (a_mode == 'edit') {
    props.former.form['state'] = props.issue_info.state
    props.former.form['priority'] = props.issue_info.priority
    props.former.form['creator_id'] = props.issue_info.creator_id
    props.former.form['assignee_id'] = props.issue_info.assignee_id
    props.former.form['category_id'] = props.issue_info.category_id
    props.former.form['milestone_id'] = props.issue_info.milestone_id
  }
  console.log('former')

  mode.value = a_mode
}
</script>

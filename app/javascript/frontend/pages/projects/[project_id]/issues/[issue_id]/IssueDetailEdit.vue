<template>
  <div class="d-flex mb-2">
    <span class="small text-muted">{{ title }}</span>
    <span class="ms-auto" v-if="editable">
      <a href="#" @click.prevent="switchMode('edit')" v-if="mode != 'edit'"><i class="far fa-edit"></i></a>
      <a href="#" @click.prevent="switchMode('show')" v-else><i class="far fa-times text-muted"></i></a>
    </span>
  </div>

  <div v-if="mode == 'edit'">
    <layouts.form_vertical v-bind="{ former }" @submit.prevent="onSubmit" :default_wrapper_config="{ size: 'small' }">
      <div class="mb-2">
        <slot name="editable" />
      </div>

      <div class="x-actions x-spacer-2">
        <layouts.submit class="btn-sm">更新</layouts.submit>
        <button class="btn btn-sm btn-secondary" @click="mode = 'show'">取消</button>
      </div>
    </layouts.form_vertical>
  </div>
  <template v-else>
    <slot />
  </template>
  <hr>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { IssueInfo } from "@/models"
import { ref } from "vue"

const props = withDefaults(defineProps<{
  code: string
  title: string
  issue_info: IssueInfo
  former: Former<Record<string, any>>
  editable?: boolean
}>(), {
  editable: true
})

const mode = ref('show' as 'show' | 'edit')

async function onSubmit() {
  await props.former.submit(props.code)
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

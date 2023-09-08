<template>
  <div v-if="editing">
    <h5>{{ attribute_name }}</h5>
    <slot name="edit" :code="code" :form="form" />
    <div class="x-actions">
      <SubmitButton custom_class="btn-sm" :func="issueEdit">更新问题</SubmitButton>
      <button class="btn btn-sm btn-secondary" @click="editing = false">取消</button>
    </div>
  </div>
  <template v-else>
    <div class="d-flex">
      <span class="small text-muted">{{ attribute_name }}</span>
      <span class="ms-auto"><i class="far fa-edit text-primary" role="button" @click="editing = true" /></span>
    </div>
    <slot />
  </template>
  <hr>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import * as requests from "@/requests"
import { Validations, forms, layouts } from "@/components/simple_form"
import { Issue } from "@/models"

import SubmitButton from "@/components/SubmitButton.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
  code: string
  form: object
  validations: Validations
  attribute_name: string
}>()

const emits = defineEmits<{
  updateIssue: [issue: Issue]
}>()

const editing = ref(false)

async function issueEdit() {
  props.validations.clear()

  try {
    const issue = await new requests.IssueUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
    }).perform({ [props.code]: props.form[props.code] })
    if (issue) {
      editing.value = false
      emits("updateIssue", issue)
    }
  } catch (error) {
    if (props.validations.handleError(error)) {
      return
    }

    throw error
  }
}
</script>

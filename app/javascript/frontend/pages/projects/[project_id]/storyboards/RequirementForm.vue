<template>
<div class="space-y-3">
  <FormGroup path="title" label="名称">
    <controls.string />
  </FormGroup>
  <FormGroup path="description" label="描述">
    <controls.markdown />
  </FormGroup>

  <FormGroup path="platform_ids" label="平台">
    <controls.checkboxes v-bind="{ name: 'platform_ids[]', collection: platforms, labelMethod: 'name', valueMethod: 'id' }" />
  </FormGroup>

  <FormGroup path="label_ids" label="标签">
    <controls.checkboxes v-bind="{ name: 'label_ids[]', collection: test_case_labels, labelMethod: 'name', valueMethod: 'id' }" />
  </FormGroup>

  <template v-for="label in test_case_labels">
    <FormGroup v-if="former.form.label_ids.includes(label.id)" :path="`label_descriptions.${label.id}`" :label="label.name">
      <controls.markdown />
    </FormGroup>
  </template>
</div>
</template>

<script setup lang="ts">
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'
import type { Platform, TestCaseLabel } from '@/models';

const props = defineProps<{
  former: Former<any>,
  platforms: Platform[],
  test_case_labels: TestCaseLabel[],
}>()

const { Form, FormGroup } = FormFactory<typeof props.former.form>()
</script>
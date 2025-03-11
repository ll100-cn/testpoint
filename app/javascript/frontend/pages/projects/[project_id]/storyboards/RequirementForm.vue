<template>
<div class="space-y-3">
  <FormGroup path="title" label="名称">
    <controls.String />
  </FormGroup>
  <FormGroup path="description" label="描述">
    <controls.Markdown />
  </FormGroup>

  <FormGroup path="scene_id" label="场景">
    <controls.Select include-blank>
      <option v-for="scene of scenes" :value="scene.id">{{ scene.name }}</option>
    </controls.Select>
  </FormGroup>

  <FormGroup path="platform_ids" label="平台">
    <controls.checkboxes v-bind="{ name: 'platform_ids[]', collection: platforms, labelMethod: 'name', valueMethod: 'id' }" />
  </FormGroup>

  <FormGroup path="label_ids" label="标签">
    <controls.checkboxes v-bind="{ name: 'label_ids[]', collection: test_case_labels, labelMethod: 'name', valueMethod: 'id' }" />
  </FormGroup>

  <template v-for="label in test_case_labels">
    <FormGroup v-if="former.form.label_ids.includes(label.id)" :path="`label_descriptions.${label.id}`" :label="label.name">
      <controls.Markdown />
    </FormGroup>
  </template>
</div>
</template>

<script setup lang="ts">
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import type { Platform, Scene, TestCaseLabel } from '@/models';

const props = defineProps<{
  former: Former<any>,
  scenes: Scene[],
  platforms: Platform[],
  test_case_labels: TestCaseLabel[],
}>()

const Form = GenericForm<typeof props.former.form>
const FormGroup = GenericFormGroup<typeof props.former.form>
</script>

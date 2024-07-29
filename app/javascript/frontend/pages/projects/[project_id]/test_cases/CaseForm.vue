<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="role_name" label="角色"><controls.string /></FormGroup>
    <FormGroup path="scene_name" label="场景"><controls.string /></FormGroup>
    <FormGroup path="group_name" label="分组"><controls.string /></FormGroup>
    <FormGroup path="title" label="标题"><controls.string /></FormGroup>
    <FormGroup path="content" label="内容">
      <textarea id="test_case_content" v-model="former.form.content" class="form-control text optional markdown-field" name="content" />
    </FormGroup>
    <FormGroup path="platform_ids" label="平台">
      <controls.checkboxes v-bind="{ name: 'platform_ids[]', collection: platform_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
    </FormGroup>

    <FormGroup path="label_ids" label="标签">
      <controls.checkboxes v-bind="{ name: 'label_ids[]', collection: label_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { layouts } from "@/components/simple_form"
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import * as controls from '@/components/controls'
import FormGroup from '$vendor/ui/simple_form/FormGroup.vue'

const props = defineProps<{
  platform_repo: EntityRepo<Platform>
  label_repo: EntityRepo<TestCaseLabel>
  former: Former<any>
}>()

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
  (e: 'create', event: Event): void,
}>()
</script>

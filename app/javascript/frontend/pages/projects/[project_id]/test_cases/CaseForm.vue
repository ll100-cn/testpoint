<template>
  <FormErrorAlert />

  <layouts.group code="role_name" label="角色"><forms.string /></layouts.group>
  <layouts.group code="scene_name" label="场景"><forms.string /></layouts.group>
  <layouts.group code="group_name" label="分组"><forms.string /></layouts.group>
  <layouts.group code="title" label="标题"><forms.string /></layouts.group>
  <layouts.group code="content" label="内容">
    <textarea id="test_case_content" v-model="former.form.content" class="form-control text optional markdown-field" name="content" />
  </layouts.group>
  <layouts.group code="platform_ids" label="平台">
    <forms.checkboxes v-bind="{ name: 'platform_ids[]', collection: platform_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.group>

  <layouts.group code="label_ids" label="标签">
    <forms.checkboxes v-bind="{ name: 'label_ids[]', collection: label_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { forms, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'

const props = defineProps<{
  platform_repo: EntityRepo<Platform>
  label_repo: EntityRepo<TestCaseLabel>
  former: Former<Record<string, any>>
}>()

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
  (e: 'create', event: Event): void,
}>()
</script>

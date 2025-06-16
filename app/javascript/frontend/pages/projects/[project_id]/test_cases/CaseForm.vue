<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="role_name" label="角色"><controls.String /></FormGroup>
    <FormGroup path="scene_name" label="场景"><controls.String /></FormGroup>
    <FormGroup path="group_name" label="分组"><controls.String /></FormGroup>
    <FormGroup path="title" label="标题"><controls.String /></FormGroup>
    <FormGroup path="content" label="内容">
      <controls.Markdown />
    </FormGroup>
    <FormGroup path="platform_ids" label="平台">
      <controls.CheckboxCollection :collection="platform_repo.values()" item-label="name" item-value="id" />
    </FormGroup>

    <FormGroup path="label_ids" label="标签">
      <controls.CheckboxCollection :collection="label_repo.values()" item-label="name" item-value="id" />
    </FormGroup>

    <FormGroup path="storyboard_id" label="所属故事板">
      <controls.Select include-blank>
        <option v-for="{ storyboard } in storyboard_boxes" :value="storyboard.id">
          {{ storyboard.title }}
        </option>
      </controls.Select>
    </FormGroup>

    <FormGroup path="requirement_id" label="所属需求">
      <controls.Select include-blank>
        <option v-for="{ requirement } in requirement_boxes" :value="requirement.id">{{ requirement.title }}</option>
      </controls.Select>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { EntityRepo, Platform, Requirement, RequirementBox, RequirementPage, Roadmap, StoryboardBox, TestCase, TestCaseLabel } from '@/models'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'
import * as q from '@/requests'
import { computed, ref, watch } from 'vue'
import { usePageStore } from '@/store'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()


const props = defineProps<{
  platform_repo: EntityRepo<Platform>
  label_repo: EntityRepo<TestCaseLabel>
  former: Former<any>
  newest_roadmap: Roadmap
  storyboard_boxes: StoryboardBox[]
  requirement_boxes: RequirementBox[]
}>()

const FormGroup = GenericFormGroup<typeof props.former.form>
const Form = GenericForm<typeof props.former.form>

</script>

<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="role_name" label="角色"><controls.string /></FormGroup>
    <FormGroup path="scene_name" label="场景"><controls.string /></FormGroup>
    <FormGroup path="group_name" label="分组"><controls.string /></FormGroup>
    <FormGroup path="title" label="标题"><controls.string /></FormGroup>
    <FormGroup path="content" label="内容">
      <controls.markdown />
    </FormGroup>
    <FormGroup path="platform_ids" label="平台">
      <controls.checkboxes v-bind="{ name: 'platform_ids[]', collection: platform_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
    </FormGroup>

    <FormGroup path="label_ids" label="标签">
      <controls.checkboxes v-bind="{ name: 'label_ids[]', collection: label_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
    </FormGroup>

    <FormGroup path="storyboard_id" label="所属故事板">
      <controls.select include_blank>
        <option v-for="storyboard in storyboards" :value="storyboard.id">{{ storyboard.title }}</option>
      </controls.select>
    </FormGroup>

    <FormGroup path="requirement_id" label="所属需求">
      <controls.select include_blank>
        <option v-for="requirement in requirements" :value="requirement.id">{{ requirement.title }}</option>
      </controls.select>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { EntityRepo, Platform, Requirement, Roadmap, TestCase, TestCaseLabel } from '@/models'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import * as controls from '@/components/controls'
import FormGroup from '$vendor/ui/simple_form/FormGroup.vue'
import * as q from '@/requests'
import { getCurrentInstance, ref, watch } from 'vue'
import { usePageStore } from '@/store'

const proxy = getCurrentInstance()!.proxy!
const page = usePageStore()

const props = defineProps<{
  platform_repo: EntityRepo<Platform>
  label_repo: EntityRepo<TestCaseLabel>
  former: Former<any>
  newest_roadmap: Roadmap
}>()

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
  (e: 'create', event: Event): void,
}>()

const storyboards = ref(await new q.project.StoryboardReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = page.inProject()!.project_id
}).perform())

const requirements = ref([] as Requirement[])
if (props.former.form.storyboard_id) {
  requirements.value = (await requestRequirement(props.former.form.storyboard_id))
}

watch(() => props.former.form.storyboard_id, async (storyboard_id) => {
  if (storyboard_id) {
    requirements.value = (await requestRequirement(storyboard_id))
    props.former.form.requirement_id = null
  }
})

async function requestRequirement(storyboard_id: number) {
  const new_requirements = await new q.project.RequirementReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = page.inProject()!.project_id
    req.interpolations.storyboard_id = storyboard_id
    req.query.roadmap_id = props.newest_roadmap.id
  }).perform()

  return new_requirements
}

watch

</script>

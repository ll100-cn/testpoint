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
        <option v-for="storyboard_box in storyboard_page.list" :value="storyboard_box.storyboard.id">
          {{ storyboard_box.storyboard.title }}
        </option>
      </controls.Select>
    </FormGroup>

    <FormGroup path="requirement_id" label="所属需求">
      <controls.Select include-blank>
        <option v-for="requirement in (requirement_page?.list.map(box => box.requirement) ?? [])" :value="requirement.id">{{ requirement.title }}</option>
      </controls.Select>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import useRequestList from '@/lib/useRequestList'
import { EntityRepo, Platform, Requirement, RequirementBox, RequirementPage, Roadmap, TestCase, TestCaseLabel } from '@/models'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'
import * as q from '@/requests'
import { ref, watch } from 'vue'
import { usePageStore } from '@/store'

const reqs = useRequestList()
const page = usePageStore()

const props = defineProps<{
  platform_repo: EntityRepo<Platform>
  label_repo: EntityRepo<TestCaseLabel>
  former: Former<any>
  newest_roadmap: Roadmap
}>()

const FormGroup = GenericFormGroup<typeof props.former.form>
const Form = GenericForm<typeof props.former.form>

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
  (e: 'create', event: Event): void,
}>()

const requirement_page = ref(null as RequirementPage<RequirementBox> | null)

const storyboard_page = reqs.add(q.project.storyboards.List).setup(req => {
  req.interpolations.project_id = page.inProject()!.project_id
}).wait()
if (props.former.form.storyboard_id) {
  requestRequirement(props.former.form.storyboard_id)
}
await reqs.performAll()

watch(() => props.former.form.storyboard_id, async (storyboard_id) => {
  if (storyboard_id) {
    requestRequirement(storyboard_id)
    await reqs.performAll()
    props.former.form.requirement_id = null
  }
})

function requestRequirement(storyboard_id: number) {
  reqs.add(q.project.requirements.List).setup(req => {
    req.interpolations.project_id = page.inProject()!.project_id
    req.interpolations.storyboard_id = storyboard_id
    req.query.roadmap_id = props.newest_roadmap.id
  }).waitFor(requirement_page)
}

</script>

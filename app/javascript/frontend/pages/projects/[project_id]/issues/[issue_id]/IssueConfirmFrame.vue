<template>
  <div ref="el" class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">确认问题</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body">
          <FormErrorAlert />

          <div class="row gy-3">
            <layouts.group code="title" label="标题">
              <controls.string />
            </layouts.group>

            <layouts.group code="category_id" label="分类">
              <controls.bootstrap_select>
                <BSOption v-for="category in categories" :value="category.id">
                  {{ category.name }}
                </BSOption>
              </controls.bootstrap_select>
            </layouts.group>

            <layouts.group code="assignee_id" label="受理人">
              <controls.select include_blank>
                <OptionsForMember :collection="members" except_level="reporter" />
              </controls.select>
            </layouts.group>
          </div>
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>确认</layouts.submit>
        </div>
      </layouts.form_vertical>
    </div>
  </div>
</template>

<script setup lang="ts">
import BSOption from "@/components/BSOption.vue"
import OptionsForMember from "@/components/OptionsForMember.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import BootstrapHelper from "@/lib/BootstrapHelper"
import * as q from '@/lib/requests'
import { Category, IssueInfo, MemberInfo } from "@/models"
import { usePageStore } from "@/store"
import { getCurrentInstance, nextTick, ref } from "vue"

const page = usePageStore()
const el = ref(null! as HTMLElement)
const { proxy } = getCurrentInstance()

const emit = defineEmits<{
  updated: [ IssueInfo ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const former = Former.build({
  title: props.issue_info.title,
  category_id: props.issue_info.category_id,
  assignee_id: props.issue_info.assignee_id,
  state: 'confirmed',
})

former.perform = async function() {
  const a_issue_action = await new q.bug.IssueActionReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform(this.form)

  Object.assign(props.issue_info, a_issue_action.issue)
  props.issue_info.activities.push(...a_issue_action.activities)
  emit('updated', props.issue_info)
  BootstrapHelper.modal(el).hide()
}

const loading = ref(true)
const members = ref([] as MemberInfo[])
const categories = ref([] as Category[])
async function reset() {
  loading.value = true

  members.value = await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform()
  categories.value = await page.inProject().request(q.project.CategoryReq.List).setup(proxy).perform()

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({
  reset
})

</script>

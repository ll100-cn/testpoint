<template>
  <PageHeader>
    <PageTitle>新增平台</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" :member_boxes="member_boxes" :project_id="project_id" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>新增平台</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/platforms`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import { usePageStore, useSessionStore } from "@/store"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import { computed } from 'vue'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const line = useQueryLine()
const params = route.params as any
const page = usePageStore()
const session = useSessionStore()

const project_id = params.project_id

const { data: member_page } = line.request(q.project.members.InfoList, (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
const member_boxes = computed(() => member_page.value.list)

const former = Former.build({
  name: "",
  default_assignee_id: "",
  icon_svg: "",
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  await reqs.add(q.project.platforms.Create).setup(req => {
    req.interpolations.project_id = project_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/platforms')
}
</script>

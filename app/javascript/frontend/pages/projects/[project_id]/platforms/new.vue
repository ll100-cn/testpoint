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
          <Button variant="secondary" :to="`${path_info.collection}`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
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
import PathHelper from '@/lib/PathHelper'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any
const page = usePageStore()
const session = useSessionStore()

const project_id = params.project_id
const path_info = PathHelper.parseCollection(route.path, 'new')

const { data: member_boxes } = line.request(q.project.members.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const former = Former.build({
  name: "",
  default_assignee_id: "",
  icon_svg: "",
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_platform_action } = line.request(q.project.platforms.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await create_platform_action({
    interpolations: { project_id },
    body: former.form,
  })

  router.push(path_info.collection)
}
</script>

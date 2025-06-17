<template>
  <PageHeader>
    <PageTitle>新增问题模版</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :project_id="project_id" v-bind="{ former }" />

      <Separator class="my-4" preset="through" />

      <div class="space-x-3">
        <Button>新增问题模版</Button>
        <Button variant="secondary" :to="return_url">取消</Button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'
import { useQueryLine } from '@/lib/useQueryLine'
import PathHelper from '@/lib/PathHelper'
import OkUrl from '@/lib/ok_url'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any
const ok_url = new OkUrl(route)

const project_id = params.project_id
const path_info = PathHelper.parseCollection(route.path, 'new')

const return_url = computed(() => ok_url.withDefault(path_info.collection))

const former = Former.build({
  name: "",
  title_suggestion: "",
  content_suggestion: "",
  lookup_by_build_form: true,
  default_priority: "normal",
  default_category_id: "",
  inputs_attributes: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_issue_template_action } = line.request(q.project.issue_templates.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await create_issue_template_action({
    interpolations: { project_id },
    body: former.form,
  })

  router.push(return_url.value)
}

</script>

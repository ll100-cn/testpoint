<template>
  <PageHeader>
    <PageTitle>修改分类</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>修改分类</Button>
          <Button variant="secondary" :to="`/projects/${params.project_id}/categories`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/requests'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'
import { useQueryLine } from '@/lib/useQueryLine'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any

const project_id = params.project_id
const category_id = params.category_id

const { data: category_box } = line.request(q.project.categories.Get(), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.category_id = category_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
const category = computed(() => category_box.value.category)

const former = Former.build({
  name: category.value.name,
  description: category.value.description,
  color: category.value.color
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_category_action } = line.request(q.project.categories.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await update_category_action({
    interpolations: { project_id, category_id },
    body: former.form,
  })

  router.push('/projects/' + project_id + '/categories')
}

</script>

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
import useRequestList from '@bbb/useRequestList'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/lib/requests'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, FormFactory } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const params = route.params as any

const project_id = params.project_id
const category_id = params.category_id

const category = reqs.add(q.project.categories.InfoGet).setup(req => {
  req.interpolations.project_id = project_id
  req.interpolations.category_id = category_id
}).wait()
await reqs.performAll()

const former = Former.build({
  name: category.value.name,
  description: category.value.description,
  color: category.value.color
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await reqs.add(q.project.categories.InfoUpdate).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.category_id = category_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/categories')
}

</script>

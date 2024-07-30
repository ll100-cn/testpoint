<template>
  <PageHeader>
    <PageTitle>修改分类</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" />

      <hr class="x-form-divider-through">

      <div class="space-x-3">
        <Button>修改分类</Button>
        <Button variant="secondary" :to="`/projects/${params.project_id}/categories`">取消</Button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/lib/requests'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id
const category_id = params.category_id
const category = ref(await new q.project.CategoryInfoReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.category_id = category_id
}).perform())

const former = Former.build({
  name: category.value.name,
  description: category.value.description,
  color: category.value.color
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.project.CategoryInfoReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.category_id = category_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/categories')
}

</script>

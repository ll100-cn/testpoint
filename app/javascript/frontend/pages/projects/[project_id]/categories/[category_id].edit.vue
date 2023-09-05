<template>
  <div class="page-header">
    <h2>修改分类</h2>
  </div>

  <form>
    <Form :form="form" :project_id="project_id" :validations="validations" />
    <hr>
    <layouts.vertical_group label_class="col-2">
      <div class="x-actions">
        <SubmitButton submit_text="修改分类" :func="onSubmit" />
        <router-link class="btn btn-secondary" :to="`/projects/${project_id}/categories`">取消</router-link>
      </div>
    </layouts.vertical_group>
  </form>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations, layouts } from "@/components/simple_form"
import * as requests from '@/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Form from './Form.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id
const category_id = params.category_id
const validations = ref(new Validations())
const category = ref(await new requests.CategoryShow().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.category_id = category_id
}).perform())

const form = ref({
  name: category.value.name,
  description: category.value.description,
  color: category.value.color
})

async function onSubmit() {
  validations.value.clear()

  try {
    const category = await new requests.CategoryUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.category_id = category_id
    }).perform(form.value)
    if (category) {
      router.push('/projects/' + project_id + '/categories')
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}

</script>

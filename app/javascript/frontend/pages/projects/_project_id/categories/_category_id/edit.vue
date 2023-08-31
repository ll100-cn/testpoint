<template>
  <div class="page-header">
    <h2>修改分类</h2>
  </div>

  <form>
    <Form :form="form" :project_id="project_id" :validations="validations" />
  </form>

  <hr>

  <div class="x-actions offset-2">
    <SubmitButton submit_text="修改分类" :func="onSubmit" />
    <router-link class="btn btn-secondary" :to="`/projects/${project_id}/categories`">取消</router-link>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations } from "@/components/simple_form"
import * as requests from '@/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Form from '../Form.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const project_id = route.params.project_id as string
const category_id = route.params.category_id
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

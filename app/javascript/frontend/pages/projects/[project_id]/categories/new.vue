<template>
  <div class="page-header">
    <h2>新增分类</h2>
  </div>

  <form>
    <Form :form="form" :project_id="project_id" :validations="validations" />
    <hr>
    <layouts.horizontal_group label_class="col-2">
      <div class="x-actions">
        <SubmitButton submit_text="新增分类" :func="onSubmit" />
        <router-link class="btn btn-secondary" :to="`/projects/${project_id}/categories`">取消</router-link>
      </div>
    </layouts.horizontal_group>
  </form>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations, layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Form from './Form.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id
const validations = ref(new Validations())

const form = ref({
  name: "",
  description: "",
  color: "#ace0ef"
})

async function onSubmit() {
  validations.value.clear()

  try {
    const category = await new requests.CategoryReq.Create().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
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

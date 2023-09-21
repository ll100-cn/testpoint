<template>
  <div class="page-header">
    <h2>修改分类</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>修改分类</layouts.submit>
          <router-link class="btn btn-secondary" :to="`/projects/${project_id}/categories`">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import Former from '@/components/simple_form/Former'
import Fields from './Fields.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id
const category_id = params.category_id
const category = ref(await new requests.CategoryReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.category_id = category_id
}).perform())

const former = Former.build({
  name: category.value.name,
  description: category.value.description,
  color: category.value.color
})

former.perform = async function() {
  await new requests.CategoryReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.category_id = category_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/categories')
}

</script>

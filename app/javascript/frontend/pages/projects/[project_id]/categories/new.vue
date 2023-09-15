<template>
  <div class="page-header">
    <h2>新增分类</h2>
  </div>

  <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields />

    <template #actions>
      <layouts.submit>新增分类</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${params.project_id}/categories`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import FormHorizontal from '@/components/FormHorizontal.vue'
import Former from '@/components/simple_form/Former'
import Fields from './Fields.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const former = Former.build({
  name: "",
  description: "",
  color: "#ace0ef"
})

former.perform = async function() {
  await new requests.CategoryReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
  }).perform(this.form)
  router.push('/projects/' + params.project_id + '/categories')
}
</script>

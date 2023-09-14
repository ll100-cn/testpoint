<template>
  <div class="page-header">
    <h2>新增项目</h2>
  </div>

  <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields v-bind="{ former }" />

    <template #actions>
      <layouts.submit>新增项目</layouts.submit>
      <router-link class="btn btn-secondary" to="/projects">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import FormHorizontal from '@/components/FormHorizontal.vue'
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import Fields from './Fields.vue'

const router = useRouter()
const proxy = getCurrentInstance()!.proxy!

const former = Former.build({
  name: ""
})

former.perform = async function() {
  await new requests.ProjectReq.Create().setup(proxy).perform(this.form)
  router.push("/projects")
}
</script>

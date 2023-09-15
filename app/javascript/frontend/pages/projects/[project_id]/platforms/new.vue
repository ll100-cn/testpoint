<template>
  <div class="page-header">
    <h2>新增平台</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields :members="members" :project_id="project_id" />

    <template #actions>
      <layouts.submit>新增平台</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/platforms`">取消</router-link>
    </template>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id as string

const members = ref(await new requests.MemberReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const former = Former.build({
  name: "",
  default_assignee_id: "",
})

former.perform = async function() {
  await new requests.PlatformReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/platforms')
}
</script>

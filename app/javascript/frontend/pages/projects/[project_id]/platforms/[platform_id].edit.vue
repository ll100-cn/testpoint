<template>
  <div class="page-header">
    <h2>修改平台</h2>
  </div>

  <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields :members="members" :project_id="project_id" />

    <template #actions>
      <layouts.submit>修改平台</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/platforms`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import FormHorizontal from '@/components/FormHorizontal.vue'
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

const project_id = params.project_id
const platform_id = params.platform_id
const platform = ref(await new requests.PlatformReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.platform_id = platform_id
}).perform())

const members = ref(await new requests.MemberReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const former = Former.build({
  name: platform.value.name,
  default_assignee_id: platform.value.default_assignee_id,
})

former.perform = async function() {
  await new requests.PlatformReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.platform_id = platform_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/platforms')
}
</script>

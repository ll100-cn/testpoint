<template>
  <div class="page-header">
    <h2>新增成员</h2>
  </div>

  <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields :project_id="project_id" v-bind="{ former }" />

    <template #actions>
      <layouts.submit>新增成员</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/members`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import FormHorizontal from '@/components/FormHorizontal.vue'
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id

const former = Former.build({
  user_email: "",
  nickname: "",
  role: ""
})

former.perform = async function() {
  await new requests.MemberReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/members')
}
</script>

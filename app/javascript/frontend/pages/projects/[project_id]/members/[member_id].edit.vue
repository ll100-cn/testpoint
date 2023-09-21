<template>
  <div class="page-header">
    <h2>修改成员</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields mode="edit" :project_id="project_id" v-bind="{ former }" />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>修改成员</layouts.submit>
          <router-link class="btn btn-secondary" :to="`/projects/${project_id}/members`">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { Validations, layouts } from "@/components/simple_form"
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
const member_id = params.member_id
const validations = ref(new Validations())
const member = ref(await new requests.MemberReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.member_id = member_id
}).perform())

const former = Former.build({
  user_email: member.value.email,
  nickname: member.value.name,
  role: member.value.role
})

former.perform = async function() {
  await new requests.MemberReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.member_id = member_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/members')
}
</script>

<template>
  <div class="page-header">
    <h2>修改成员</h2>
  </div>

  <Form mode="edit" :form="form" :project_id="project_id" :validations="validations" />

  <hr>

  <div class="x-actions offset-2">
    <SubmitButton submit_text="修改成员" :func="onSubmit" />
    <router-link class="btn btn-secondary" :to="`/projects/${project_id}/members`">取消</router-link>
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
const member_id = route.params.member_id
const validations = ref(new Validations())
const member = ref(await new requests.MemberShow().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.member_id = member_id
}).perform())

const form = ref({
  user_email: member.value.email,
  nickname: member.value.name,
  role: member.value.role
})

async function onSubmit() {
  validations.value.clear()

  try {
    const member = await new requests.MemberUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.member_id = member_id
    }).perform(form.value)
    if (member) {
      router.push('/projects/' + project_id + '/members')
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}

</script>

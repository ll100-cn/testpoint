<template>
  <div class="page-header">
    <h2>修改成员</h2>
  </div>

  <form>
    <Form mode="edit" :form="form" :project_id="project_id" :validations="validations" />
    <hr>
    <layouts.vertical_group label_class="col-2">
      <div class="x-actions">
        <SubmitButton submit_text="修改成员" :func="onSubmit" />
        <router-link class="btn btn-secondary" :to="`/projects/${project_id}/members`">取消</router-link>
      </div>
    </layouts.vertical_group>
  </form>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations, layouts } from "@/components/simple_form"
import * as requests from '@/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Form from './Form.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id
const member_id = params.member_id
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

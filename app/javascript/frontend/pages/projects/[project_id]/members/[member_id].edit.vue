<template>
  <div class="page-header">
    <h2>修改成员</h2>
  </div>

  <FormHorizontal :validations="validations">
    <Fields mode="edit" :form="form" :project_id="project_id" :validations="validations" />

    <template #actions>
      <SubmitButton submit_text="修改成员" :func="onSubmit" />
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/members`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Validations, layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import SubmitButton from '@/components/SubmitButton.vue'
import Fields from './Fields.vue'
import FormHorizontal from '@/components/FormHorizontal.vue'

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

const form = ref({
  user_email: member.value.email,
  nickname: member.value.name,
  role: member.value.role
})

async function onSubmit() {
  validations.value.clear()

  try {
    const member = await new requests.MemberReq.Update().setup(proxy, (req) => {
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

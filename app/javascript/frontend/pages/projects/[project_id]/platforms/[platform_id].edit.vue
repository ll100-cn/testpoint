<template>
  <div class="page-header">
    <h2>修改平台</h2>
  </div>

  <FormHorizontal :validations="validations">
    <Fields :members="members" :form="form" :project_id="project_id" :validations="validations" />

    <template #actions>
      <SubmitButton submit_text="修改平台" :func="onSubmit" />
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/platforms`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import FormHorizontal from '@/components/FormHorizontal.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { Validations } from "@/components/simple_form"
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
const validations = ref(new Validations())
const platform = ref(await new requests.PlatformReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.platform_id = platform_id
}).perform())

const members = ref(await new requests.MemberReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const form = ref({
  name: platform.value.name,
  default_assignee_id: platform.value.default_assignee_id,
})

async function onSubmit() {
  validations.value.clear()

  try {
    const platform = await new requests.PlatformReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.platform_id = platform_id
    }).perform(form.value)
    if (platform) {
      router.push('/projects/' + project_id + '/platforms')
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}

</script>

<template>
  <div class="page-header">
    <h2>新增项目</h2>
  </div>

  <FormHorizontal :validations="validations">
    <Fields :form="form" :validations="validations" />

    <template #actions>
      <SubmitButton submit_text="新增项目" :func="onSubmit" />
      <router-link class="btn btn-secondary" to="/projects">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'

import { Validations, layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Fields from './Fields.vue'
import FormHorizontal from '@/components/FormHorizontal.vue'

const router = useRouter()
const proxy = getCurrentInstance()!.proxy!

const validations = ref(new Validations())

const form = ref({
  name: ""
})

async function onSubmit() {
  validations.value.clear()

  try {
    const user = await new requests.ProjectReq.Create().setup(proxy).perform(form.value)
    if (user) {
      router.push("/projects")
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}

</script>

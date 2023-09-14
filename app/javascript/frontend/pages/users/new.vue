<template>
  <div class="page-header">
    <h2>新增成员</h2>
  </div>

  <FormHorizontal :validations="validations">
    <Fields :form="form" :validations="validations" />

    <template #actions>
      <SubmitButton submit_text="新增成员" :func="onSubmit" />
      <router-link class="btn btn-secondary" to="/users">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import FormHorizontal from '@/components/FormHorizontal.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { Validations } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
import Fields from './Fields.vue'

const router = useRouter()
const proxy = getCurrentInstance()!.proxy!

const validations = ref(new Validations())

const form = ref({
  email: "",
  name: ""
})

async function onSubmit() {
  validations.value.clear()

  try {
    const user = await new requests.UserReq.Create().setup(proxy).perform(form.value)
    if (user) {
      router.push("/users")
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}

</script>

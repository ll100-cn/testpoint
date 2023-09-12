<template>
  <div class="page-header">
    <h2>新增成员</h2>
  </div>

  <form>
    <Form :form="form" :validations="validations" />
    <hr>
    <layouts.vertical_group label_class="col-2">
      <div class="x-actions">
        <SubmitButton submit_text="新增成员" :func="onSubmit" />
        <router-link class="btn btn-secondary" to="/users">取消</router-link>
      </div>
    </layouts.vertical_group>
  </form>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'

import { Validations, layouts } from "@/components/simple_form"
import * as requests from '@/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Form from './Form.vue'

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
    const user = await new requests.UserCreate().setup(proxy).perform(form.value)
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

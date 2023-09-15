<template>
  <div class="page-header">
    <h2>新增成员</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields v-bind="{ former }" />

    <template #actions>
      <layouts.submit>新增成员</layouts.submit>
      <router-link class="btn btn-secondary" to="/users">取消</router-link>
    </template>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import Fields from './Fields.vue'

const router = useRouter()
const proxy = getCurrentInstance()!.proxy!

const former = Former.build({
  email: "",
  name: ""
})

former.perform = async function() {
  const user = await new requests.UserReq.Create().setup(proxy).perform(this.form)
  router.push("/users")
}

</script>

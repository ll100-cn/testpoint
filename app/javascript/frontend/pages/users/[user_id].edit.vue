<template>
  <div class="page-header">
    <h2>编辑用户</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields v-bind="{ former }" mode="edit" />

    <template #actions>
      <layouts.submit>编辑用户</layouts.submit>
      <router-link :to="`/users`" class="btn btn-secondary">返回</router-link>
    </template>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const router = useRouter()
const params = route.params as any

const user = await new requests.UserReq.Get().setup(proxy, (req) => {
  req.interpolations.id = params.user_id
}).perform()

const former = Former.build({
  email: user.email,
  name: user.name
})

former.perform = async function() {
  await new requests.UserReq.Update().setup(proxy, (req) => {
    req.interpolations.id = user.id
  }).perform(this.form)

  router.push(`/users`)
}

</script>

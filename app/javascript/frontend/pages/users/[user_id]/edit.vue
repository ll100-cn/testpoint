<template>
  <div class="page-header">
    <h2>编辑用户</h2>
  </div>

  <FormHorizontal :validations="validations" @submit="userUpdate">
    <Fields :validations="validations" :form="form" />

    <template #actions>
      <input type="submit" name="commit" value="编辑用户" class="btn btn-primary">
      <router-link :to="`/users`" class="btn btn-secondary">返回</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import { Validations } from '@/components/simple_form'
import * as requests from '@/lib/requests'
import _ from 'lodash'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from '../Fields.vue'
import FormHorizontal from '@/components/FormHorizontal.vue'

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const router = useRouter()
const params = route.params as any

const validations = reactive<Validations>(new Validations())
const user_id = params.user_id
const form = ref({
  email: null as string | null,
  name: null as string | null
})

const user = await new requests.UserReq.Get().setup(proxy, (req) => {
  req.interpolations.id = _.toNumber(user_id)
}).perform()

form.value.email = user.email
form.value.name = user.name


async function userUpdate(event: Event) {
  event.preventDefault()
  validations.clear()

  const form_data = new FormData(event.target as HTMLFormElement)
  try {
    await new requests.UserReq.Update().setup(proxy, (req) => {
      req.interpolations.id = user.id
    }).perform(form_data)

    router.push(`/users`)
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

</script>

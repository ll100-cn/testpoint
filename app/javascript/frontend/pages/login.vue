<template>
  <div class="page-header">
    <h2>编辑用户</h2>
  </div>

  <form v-if="!login_code" @submit.prevent="deliver">
    <FormErrorAlert :validations="validations" />
    <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('email')" label="邮箱">
      <forms.string v-bind="{ ...slotProps, form}" />
    </layouts.vertical_group>

    <hr>

    <div class="x-spacer-x-1">
      <input type="submit" name="commit" value="登陆" class="btn btn-primary">
    </div>
  </form>

  <form v-else @submit.prevent="verify">
    <FormErrorAlert :validations="validations" />
    <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('email')" label="邮箱">
      <div class="form-control-plaintext">{{ form.email }}</div>
    </layouts.vertical_group>

    <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('login_code')" label="验证码">
      <forms.string v-bind="{ ...slotProps, form}" />
    </layouts.vertical_group>

    <hr>

    <div class="x-spacer-x-1">
      <input type="submit" name="commit" value="登陆" class="btn btn-primary">
      <input type="button" value="取消" class="btn btn-primary" @click="login_code = null">
    </div>
  </form>
</template>

<route>
{
  "meta": {
    "auth": false
  }
}
</route>

<script setup lang="ts">
import { Validations, forms, layouts } from "@/components/simple_form"
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { getCurrentInstance, reactive, ref } from "vue"
import * as requests from "@/requests"
import { LoginCode } from "@/models"
import { routerKey } from "vue-router"
import { useRouter } from "vue-router"

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()

const validations = reactive<Validations>(new Validations())

const form = ref({
  email: null as string | null,
  login_code: null as string | null
})

const login_code = ref(null as LoginCode | null)
async function deliver() {
  login_code.value = await new requests.LoginCodeDeliver().setup(proxy).perform(form.value)
}

async function verify() {
  try {
    await new requests.LoginCodeVerify().setup(proxy).perform({ user: form.value })
    router.push("/")
  } catch(err) {
    if (err instanceof requests.ErrorUnauthorized) {
      validations.invalid("login_code", "验证码错误")
      return
    }

    throw err
  }
}
</script>
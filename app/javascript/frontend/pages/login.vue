<template>
  <div class="row mt-5">
    <div class="col-12 col-xxl-4 col-xl-5 col-lg-7 col-md-9 mx-auto">
      <div class="card">
        <div class="card-header">用户登陆</div>

        <form v-if="!login_code" @submit.prevent="onDeliver">
          <div class="card-body">
            <FormErrorAlert :validations="validations" />
            <div class="row gy-3">
              <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('email')" label="邮箱">
                <forms.string v-bind="{ ...slotProps, form}" />
              </layouts.vertical_group>
            </div>
          </div>

          <div class="card-footer x-spacer-2">
            <input type="submit" name="commit" value="登陆" class="btn btn-primary">
          </div>
        </form>

        <form v-else @submit.prevent="onVerify">
          <div class="card-body">
            <FormErrorAlert :validations="validations" />
            <div class="row gy-3">
              <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('email')" label="邮箱">
                <div class="form-control-plaintext">{{ form.email }}</div>
              </layouts.vertical_group>

              <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('login_code')" label="验证码">
                <forms.string v-bind="{ ...slotProps, form}" />
              </layouts.vertical_group>
            </div>
          </div>

          <div class="card-footer x-spacer-2">
            <input type="submit" name="commit" value="登陆" class="btn btn-primary">
            <input type="button" value="取消" class="btn btn-secondary" @click="login_code = null">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<route>
{
  "meta": {
    "auth": false
  }
}
</route>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { Validations, forms, layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import { LoginCode } from "@/models"
import { useSessionStore } from '@/store'
import { getCurrentInstance, reactive, ref } from "vue"
import { useRouter } from "vue-router"

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const session = useSessionStore()

const validations = reactive<Validations>(new Validations())

const form = ref({
  email: null as string | null,
  login_code: null as string | null
})

const login_code = ref(null as LoginCode | null)
async function onDeliver() {
  login_code.value = await new requests.LoginCodeDeliver().setup(proxy).perform(form.value)
}

async function onVerify() {
  try {
    await new requests.LoginCodeVerify().setup(proxy).perform({ user: form.value })
    session.account = undefined
    await session.prepare(proxy)
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
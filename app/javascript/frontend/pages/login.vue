<template>
  <div class="row mt-5">
    <div class="col-12 col-xxl-4 col-xl-5 col-lg-7 col-md-9 mx-auto">
      <div class="card">
        <div class="card-header">用户登陆</div>

        <layouts.form_vertical v-bind="{ former: code_former }" v-if="!login_code" @submit.prevent="code_former.submit">
          <div class="card-body">
            <FormErrorAlert />
            <div class="row gy-3">
              <layouts.group code="email" label="邮箱">
                <controls.string />
              </layouts.group>
            </div>
          </div>

          <div class="card-footer x-spacer-2">
            <layouts.submit>确定</layouts.submit>
          </div>
        </layouts.form_vertical>

        <layouts.form_vertical v-bind="{ former }" v-else @submit.prevent="former.submit">
          <div class="card-body">
            <FormErrorAlert />
            <div class="row gy-3">
              <layouts.group code="email" label="邮箱">
                <div class="form-control-plaintext">{{ former.form.email }}</div>
              </layouts.group>

              <layouts.group code="login_code" label="验证码">
                <controls.string />
              </layouts.group>
            </div>
          </div>

          <div class="card-footer x-spacer-2">
            <layouts.submit>登陆</layouts.submit>
            <input type="button" value="取消" class="btn btn-secondary" @click="login_code = null">
          </div>
        </layouts.form_vertical>
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
import { controls, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { LoginCode } from "@/models"
import { useSessionStore } from "@/store/session"
import { getCurrentInstance, ref } from "vue"
import { useRouter } from "vue-router"

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const session = useSessionStore()

const code_former = Former.build({
  email: null as string | null
})
const login_code = ref(null as LoginCode | null)

code_former.perform = async function() {
  login_code.value = await new q.profile.LoginCodeDeliver().setup(proxy).perform(this.form)
  former.form.email = this.form.email
}

const former = Former.build({
  email: null as string | null,
  login_code: null as string | null
})

former.perform = async function() {
  try {
    await new q.profile.LoginCodeVerify().setup(proxy).perform({ user: this.form })
    session.account = undefined
    await session.prepare(proxy)
    router.push("/")
  } catch(err) {
    if (err instanceof q.ErrorUnauthorized) {
      this.validations.invalid("login_code", "验证码错误")
      return
    }

    throw err
  }
}
</script>
<template>
  <Card class="mt-10 max-w-lg mx-auto w-full">
    <CardHeader>用户登陆</CardHeader>

    <CodeForm preset="vertical" v-bind="{ former: code_former }" v-if="!login_code" @submit.prevent="code_former.perform()">
      <CardContent>
        <FormErrorAlert />
        <div class="space-y-4">
          <CodeFormGroup path="email" label="邮箱">
            <controls.string />
          </CodeFormGroup>
        </div>
      </CardContent>

      <CardFooter>
        <Button>确定</Button>
      </CardFooter>
    </CodeForm>

    <Form preset="vertical" v-bind="{ former }" v-else @submit.prevent="former.perform()">
      <CardContent>
        <FormErrorAlert />

        <div class="space-y-4">
          <FormGroup path="email" label="邮箱">
            <div class="form-control-plaintext">{{ former.form.email }}</div>
          </FormGroup>

          <FormGroup path="login_code" label="验证码">
            <controls.string />
          </FormGroup>
        </div>
      </CardContent>

      <CardFooter>
        <Button>登陆</Button>
        <Button variant="secondary" @click="login_code = null">取消</Button>
      </CardFooter>
    </Form>
  </Card>
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
import useRequestList from '@bbb/useRequestList'
import * as q from '@/lib/requests'
import { LoginCode } from "@/models"
import { useSessionStore } from "@/store/session"
import { getCurrentInstance, ref } from "vue"
import { useRouter } from "vue-router"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '@/ui'
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'

const proxy = getCurrentInstance()!.proxy!
const reqs = useRequestList()
const router = useRouter()
const session = useSessionStore()

const code_former = Former.build({
  email: null as string | null
})
const login_code = ref(null as LoginCode | null)

const { Form: CodeForm, FormGroup: CodeFormGroup } = FormFactory<typeof code_former.form>()

code_former.doPerform = async function() {
  login_code.value = await reqs.add(q.profile.login.Deliver).setup(req => {
  }).perform(this.form)
  former.form.email = this.form.email
}

const former = Former.build({
  email: null as string | null,
  login_code: null as string | null
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  try {
    await reqs.add(q.profile.login.Verify).setup(req => {
    }).perform({ user: this.form })
    session.account = undefined
    await session.prepare(proxy)
    router.push("/")
  } catch(err) {
    if (err instanceof q.ErrorUnauthorized) {
      this.validator.get("base").invalid(["验证码错误"])
      return
    }

    throw err
  }
}
</script>

<template>
  <Card class="mt-10 max-w-lg mx-auto w-full">
    <CardHeader>用户登陆</CardHeader>

    <CodeForm preset="vertical" v-bind="{ former: code_former }" v-if="!login_code" @submit.prevent="code_former.perform()">
      <CardContent>
        <FormErrorAlert />
        <div class="space-y-4">
          <CodeFormGroup path="email" label="邮箱">
            <controls.String />
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
            <controls.String />
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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { LoginCode } from "@/models"
import { useSessionStore } from "@/store/session"
import { getCurrentInstance, ref } from "vue"
import { useRouter } from "vue-router"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '$ui/card'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { useQueryLine } from '@/lib/useQueryLine'
import * as controls from '@/components/controls'

const proxy = getCurrentInstance()!.proxy!
const reqs = useRequestList()
const router = useRouter()
const session = useSessionStore()
const line = useQueryLine()

const code_former = Former.build({
  email: null as string | null
})
const login_code = ref(null as LoginCode | null)

const CodeForm = GenericForm<typeof code_former.form>
const CodeFormGroup = GenericFormGroup<typeof code_former.form>

const { mutateAsync: deliver_login_code_action } = line.request(q.profile.login.Deliver, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

code_former.doPerform = async function() {
  login_code.value = await deliver_login_code_action({
    body: code_former.form,
  })
  former.form.email = this.form.email
}

const former = Former.build({
  email: null as string | null,
  login_code: null as string | null
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: verify_login_action } = line.request(q.profile.login.Verify, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  try {
    await verify_login_action({
      body: { user: this.form }
    })
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

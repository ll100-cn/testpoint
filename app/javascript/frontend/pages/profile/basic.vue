<template>
  <PageHeader current="basic" />

  <Card class="rounded-ss-none">
    <CardContent>
      <div class="px-8 mx-auto page-md-box">
        <Card class="mx-auto w-full max-w-lg">
          <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
            <CardContent>
              <div class="space-y-4">
                <FormErrorAlert />

                <FormGroup path="email" label="邮箱">
                  <controls.String v-model="account.user.email" readonly disabled />
                </FormGroup>

                <FormGroup path="name" label="姓名">
                  <controls.String />
                </FormGroup>

                <FormGroup path="avatar" label="头像">
                  <img :src="account.avatarUrl()" class="me-1" width="64" />
                  <a href="https://gravatar.com" target="_blank">修改</a>
                </FormGroup>
              </div>
            </CardContent>

            <CardFooter>
              <Button>确定修改</Button>
              <span v-if="success" class="text-success">已修改 <i class="far fa-check"></i></span>
            </CardFooter>
          </Form>
        </Card>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import * as q from "@/requests"
import useRequestList from '@/lib/useRequestList'
import { useSessionStore } from '@/store'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from './PageHeader.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'

const reqs = useRequestList()
const router = useRouter()
const session = useSessionStore()

const account = session.account
const former = Former.build({
  name: account?.user.name,
  email: account?.email,
  avatar: "",
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const success = ref(false)
watch(former.form, () => {
  success.value = false
})

former.doPerform = async function() {
  const account_box = await reqs.add(q.profile.accounts.Update).setup(req => {
  }).perform(this.form)
  session.account = account_box.account

  success.value = true
}
</script>

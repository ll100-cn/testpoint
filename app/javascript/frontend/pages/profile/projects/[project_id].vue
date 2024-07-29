<template>
  <PageHeader :current="project_id" />

  <Card class="rounded-ss-none">
    <CardContent>
      <div class="container page-md-box">
        <Card class="mx-auto w-full max-w-lg">
          <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
            <CardContent>
              <div class="space-y-4">
                <FormErrorAlert />

                <FormGroup label="项目">
                  <controls.string v-model="profile.project_name" readonly disabled />
                </FormGroup>

                <FormGroup path="nickname" label="昵称">
                  <controls.string :placeholder="`${account.name} (默认值)`" />
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
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import * as q from "@/lib/requests"
import { usePageStore, useSessionStore } from '@/store'
import _ from 'lodash'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '../PageHeader.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import { Button, Former, FormFactory } from '$vendor/ui'
import * as controls from '@/components/controls'

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const route = useRoute()
const page = usePageStore()
const session = useSessionStore()
const params = route.params as any

const project_id = _.toNumber(params.project_id)
const account = ref(session.account)
const profile = ref(session.profiles.get(project_id) ?? await new q.project.ProfileReq.Get().setup(proxy, req => {
  req.interpolations.project_id = project_id
}).perform())

const former = Former.build({
  nickname: profile.value.nickname
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

const success = ref(false)
watch(former.form, () => {
  success.value = false
})

former.doPerform = async function() {
  const a_profile = await new q.project.ProfileReq.Update().setup(proxy, req => {
    req.interpolations.project_id = project_id
  }).perform(this.form)

  session.profiles.set(a_profile.project_id, a_profile)

  success.value = true
}



</script>
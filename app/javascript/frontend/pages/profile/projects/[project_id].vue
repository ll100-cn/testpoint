<template>
  <PageHeader :current="project_id" />

  <Card class="rounded-ss-none">
    <CardContent>
      <div class="px-8 mx-auto page-md-box">
        <Card class="mx-auto w-full max-w-lg">
          <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
            <CardContent>
              <div class="space-y-4">
                <FormErrorAlert />

                <FormGroup label="项目">
                  <controls.String v-model="profile_box.profile.project_name" readonly disabled />
                </FormGroup>

                <FormGroup path="nickname" label="昵称">
                  <controls.String :placeholder="`${account?.name} (默认值)`" />
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
import useRequestList from '@/lib/useRequestList'
import * as q from "@/requests"
import { usePageStore, useSessionStore } from '@/store'
import _ from 'lodash'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '../PageHeader.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'

const reqs = useRequestList()
const router = useRouter()
const route = useRoute()
const page = usePageStore()
const session = useSessionStore()
const params = route.params as any

const project_id = _.toNumber(params.project_id)
const account = ref(session.account)
const profile_box = reqs.raw(session.request(q.project.profiles.Get, project_id)).setup().wait()
await reqs.performAll()

const former = Former.build({
  nickname: profile_box.value.profile.nickname
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const success = ref(false)
watch(former.form, () => {
  success.value = false
})

former.doPerform = async function() {
  await reqs.add(q.project.profiles.Update).setup(req => {
    req.interpolations.project_id = project_id
  }).waitFor(profile_box).perform(this.form)

  success.value = true
}
</script>

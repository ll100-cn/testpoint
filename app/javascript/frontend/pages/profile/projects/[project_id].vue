<template>
  <PageHeader :current="project_id" />

  <div class="card">
    <div class="card-body">
      <div class="container page-md-box">
        <div class="card col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto">
          <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
            <div class="card-body">
              <div class="row gy-3">
                <FormErrorAlert />

                <layouts.group label="项目">
                  <controls.string v-model="profile.project_name" readonly disabled />
                </layouts.group>

                <layouts.group code="nickname" label="昵称">
                  <controls.string :placeholder="`${account.name} (默认值)`" />
                </layouts.group>
              </div>
            </div>
            <div class="card-footer x-spacer-2">
              <layouts.submit>确定修改</layouts.submit>
              <span v-if="success" class="text-success">已修改 <i class="far fa-check"></i></span>
            </div>
          </layouts.form_vertical>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { controls, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as q from "@/lib/requests"
import { usePageStore, useSessionStore } from '@/store'
import _ from 'lodash'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '../PageHeader.vue'

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

const success = ref(false)
watch(former.form, () => {
  success.value = false
})

former.perform = async function() {
  const a_profile = await new q.project.ProfileReq.Update().setup(proxy, req => {
    req.interpolations.project_id = project_id
  }).perform(this.form)

  session.profiles.set(a_profile.project_id, a_profile)

  success.value = true
}



</script>
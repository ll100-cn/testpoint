<template>
  <PageHeader current="basic" />

  <div class="card">
    <div class="card-body">
      <div class="container page-md-box">
        <div class="card col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto">
          <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
            <div class="card-body">
              <div class="row gy-3">
                <FormErrorAlert />

                <layouts.group code="email" label="邮箱">
                  <controls.string v-model="account.user.email" readonly disabled />
                </layouts.group>

                <layouts.group code="name" label="姓名">
                  <controls.string />
                </layouts.group>

                <layouts.group code="avatar" label="头像">
                  <img :src="account.avatarUrl()" class="me-1" width="64" />
                  <a href="https://gravatar.com" target="_blank">修改</a>
                </layouts.group>
              </div>
            </div>

            <div class="card-footer x-spacer-2 d-flex align-items-center">
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
import { controls, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as q from "@/lib/requests"
import { useSessionStore } from '@/store'
import { getCurrentInstance, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from './PageHeader.vue'

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const session = useSessionStore()

const account = session.account
const former = Former.build({
  name: account.user.name
})

const success = ref(false)
watch(former.form, () => {
  success.value = false
})

former.perform = async function() {
  const account = await new q.profile.BasicReq.Update().setup(proxy).perform(this.form)
  session.account = account

  success.value = true
}
</script>
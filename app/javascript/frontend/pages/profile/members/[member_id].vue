<template>
  <PageHeader :current="member_info.id" />

  <div class="card">
    <div class="card-body">
      <div class="container page-md-box">
        <div class="card col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto">
          <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
            <div class="card-body">
              <div class="row gy-3">
                <FormErrorAlert />

                <layouts.group label="项目">
                  <controls.string v-model="member_info.project.name" readonly disabled />
                </layouts.group>

                <layouts.group code="nickname" label="昵称">
                  <controls.string :placeholder="`${account.user.name} (默认值)`" />
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
import { controls, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as requests from "@/lib/requests"
import { usePageStore, useSessionStore } from '@/store'
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '../PageHeader.vue'
import FormErrorAlert from '@/components/FormErrorAlert.vue'

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const route = useRoute()
const page = usePageStore()
const session = useSessionStore()
const params = route.params as any

const account = ref(session.account)
const member_infos = ref(await page.singleton(requests.profile.MemberInfoReq.List).setup(proxy).perform())
const member_info = computed(() => member_infos.value.find(it => it.id.toString() === params.member_id))

const former = Former.build({
  nickname: member_info.value.nickname
})

const success = ref(false)
watch(former.form, () => {
  success.value = false
})

former.perform = async function() {
  const a_member_info = await new requests.profile.MemberInfoReq.Update().setup(proxy, req => {
    req.interpolations.id = member_info.value.id
  }).perform(this.form)

  success.value = true
}



</script>
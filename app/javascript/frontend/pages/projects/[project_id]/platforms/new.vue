<template>
  <div class="page-header">
    <h2>新增平台</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields :members="members" :project_id="project_id" />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>新增平台</layouts.submit>
          <router-link class="btn btn-secondary" :to="`/projects/${project_id}/platforms`">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import { usePageStore } from "@/store"

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any
const page = usePageStore()

const project_id = params.project_id as string

const members = ref(await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform())

const former = Former.build({
  name: "",
  default_assignee_id: "",
})

former.perform = async function() {
  await new q.project.PlatformReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/platforms')
}
</script>

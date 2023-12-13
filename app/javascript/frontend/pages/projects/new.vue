<template>
  <div class="page-header">
    <h2>新增项目</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>新增项目</layouts.submit>
          <router-link class="btn btn-secondary" to="/projects">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import Fields from './Fields.vue'

const router = useRouter()
const proxy = getCurrentInstance()!.proxy!

const former = Former.build({
  name: "",
  trello_list_id: "",
  trello_api_key: "",
  trello_api_token: "",
})

former.perform = async function() {
  await new q.admin.ProjectReq.Create().setup(proxy).perform(this.form)
  router.push("/projects")
}
</script>

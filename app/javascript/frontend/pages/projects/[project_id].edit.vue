<template>
  <div class="page-header">
    <h2>编辑项目</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>编辑项目</layouts.submit>
          <router-link :to="`/projects`" class="btn btn-secondary">返回</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project = await new q.admin.ProjectReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = params.project_id
}).perform()

const former = Former.build({
  name: project.name
})

former.perform = async function() {
  await new q.admin.ProjectReq.Update().setup(proxy, (req) => {
    req.interpolations.id = project.id
  }).perform(this.form)

  router.push(`/projects`)
}

</script>

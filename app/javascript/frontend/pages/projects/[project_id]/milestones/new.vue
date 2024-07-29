<template>
  <PageHeader>
    <PageTitle>新增里程碑</PageTitle>
  </PageHeader>

  <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <input type="submit" name="commit" value="新增里程碑" class="btn btn-primary">
          <router-link :to="`/projects/${params.project_id}/milestones`" class="btn btn-secondary">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_vertical>
</template>

<script setup lang="ts">
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import { layouts } from '@/components/simple_form'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const former = Former.build({
  title: null as string | null,
  published_at: null as string | null,
  description: null as string | null,
})

former.perform = async function() {
  await new q.project.MilestoneReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
  }).perform(this.form)

  router.push(`/projects/${params.project_id}/milestones`)
}
</script>

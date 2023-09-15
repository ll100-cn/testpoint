<template>
  <div class="page-header">
    <h2>编辑里程碑</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields />

    <template #actions>
      <layouts.submit>编辑里程碑</layouts.submit>
      <router-link :to="`/projects/${project_id}/milestones`" class="btn btn-secondary">取消</router-link>
    </template>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import dayjs from 'dayjs'
import _ from 'lodash'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = params.project_id

const former = Former.build({
  title: null as string | null,
  published_at: null as string | null,
  description: null as string | null,
})

former.perform = async function() {
  await new requests.MilestoneReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform(this.form)

  router.push(`/projects/${project_id}/milestones`)
}

const milestone = await new requests.MilestoneReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.id = _.toNumber(params.milestone_id)
}).perform()

former.form.title = milestone.title
if (milestone.published_at != null) {
  former.form.published_at = dayjs(milestone.published_at).format('YYYY-MM-DD HH:mm')
}
former.form.description = milestone.description
</script>

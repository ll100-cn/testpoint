<template>
  <PageHeader>
    <PageTitle>编辑里程碑</PageTitle>
  </PageHeader>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>编辑里程碑</layouts.submit>
          <router-link :to="`/projects/${project_id}/milestones`" class="btn btn-secondary">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import dayjs from 'dayjs'
import _ from 'lodash'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = params.project_id

const former = Former.build({
  title: null as string | null,
  published_at: null as Date | null,
  description: null as string | null,
})

former.perform = async function() {
  await new q.project.MilestoneReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform(this.form)

  router.push(`/projects/${project_id}/milestones`)
}

const milestone = await new q.project.MilestoneReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.id = _.toNumber(params.milestone_id)
}).perform()

former.form.title = milestone.title
former.form.published_at = milestone.published_at
former.form.description = milestone.description
</script>

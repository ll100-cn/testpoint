<template>
  <div class="page-header">
    <h2>新增里程碑</h2>
  </div>

  <FormVertical :validations="validations" @submit="milestoneCreate">
    <Fields :validations="validations" :form="form" />

    <template #actions>
      <input type="submit" name="commit" value="新增里程碑" class="btn btn-primary">
      <router-link :to="`/projects/${project_id}/milestones`" class="btn btn-secondary">取消</router-link>
    </template>
  </FormVertical>
</template>

<script setup lang="ts">
import { Validations } from '@/components/simple_form';
import * as requests from '@/lib/requests';
import _ from 'lodash';
import { getCurrentInstance, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Fields from './Fields.vue';
import FormVertical from '@/components/FormVertical.vue'

const validations = reactive<Validations>(new Validations())
const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = _.toNumber(params.project_id)

const form = ref({
  title: null as string | null,
  published_at: null as string | null,
  description: null as string | null,
})

async function milestoneCreate(event: Event) {
  event.preventDefault()
  validations.clear()

  const form_data = new FormData(event.target as HTMLFormElement)
  try {
    await new requests.MilestoneReq.Create().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
    }).perform(form_data)

    router.push(`/projects/${project_id}/milestones`)
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}
</script>

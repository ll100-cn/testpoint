<template>
  <div class="page-header">
    <h2>新增里程碑</h2>
  </div>

  <form @submit="milestoneCreate">
    <Form :validations="validations" :form="form" />

    <hr>

    <div class="x-spacer-x-1">
      <input type="submit" name="commit" value="新增里程碑" class="btn btn-primary">
      <RouterLink :to="`/projects/${project_id}/milestones`" class="btn btn-secondary">取消</RouterLink>
    </div>

  </form>
</template>

<script setup lang="ts">
import { Validations } from '@/components/simple_form';
import * as requests from '@/requests';
import _ from 'lodash';
import { getCurrentInstance, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form from './Form.vue';
import { Milestone } from '@/models';

const validations = reactive<Validations>(new Validations())
const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()

const project_id = _.toNumber(route.params.project_id)

const form = ref({
  title: null as string | null,
  published_at: null as string | null,
  description: null as string | null,
})

async function milestoneCreate(event: Event) {
  event.preventDefault()

  const form_data = new FormData(event.target as HTMLFormElement)
  try {
    const new_test_case = await new requests.MilestoneCreate().setup(proxy, req => {
      req.interpolations.project_id = project_id
    }).perform(form_data)

    router.push(`/projects/${project_id}/milestones`)
  } catch (err) {
    if (err instanceof requests.ErrorUnprocessableEntity) {
      validations.marge(err.validations, err.names)
      return
    }

    throw err
  }
}
</script>

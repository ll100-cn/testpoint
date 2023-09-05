<template>
  <div class="page-header">
    <h2>编辑里程碑</h2>
  </div>

  <form @submit="milestoneUpdate">
    <Form :validations="validations" :form="form" />

    <hr>

    <div class="x-spacer-x-1">
      <input type="submit" name="commit" value="编辑里程碑" class="btn btn-primary">
      <RouterLink :to="`/projects/${project_id}/milestones`" class="btn btn-secondary">取消</RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Validations } from '@/components/simple_form';
import * as requests from '@/requests';
import dayjs from 'dayjs';
import _ from 'lodash';
import { getCurrentInstance, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form from './Form.vue';

const validations = reactive<Validations>(new Validations())
const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = params.project_id

const form = ref({
  title: null as string | null,
  published_at: null as string | null,
  description: null as string | null,
})

const milestone = await new requests.MilestoneShow().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.id = _.toNumber(params.milestone_id)
}).perform()

form.value.title = milestone.title
if (milestone.published_at != null) {
  form.value.published_at = dayjs(milestone.published_at).format('YYYY-MM-DD HH:mm')
}
form.value.description = milestone.description

async function milestoneUpdate(event: Event) {
  event.preventDefault()
  validations.clear()

  const form_data = new FormData(event.target as HTMLFormElement)
  try {
    await new requests.MilestoneUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.id = milestone.id
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

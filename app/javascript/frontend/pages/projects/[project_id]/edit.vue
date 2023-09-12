<template>
  <div class="page-header">
    <h2>编辑项目</h2>
  </div>

  <form @submit="projectUpdate">
    <Form :validations="validations" :form="form" />

    <hr>

    <div class="x-spacer-x-1">
      <input type="submit" name="commit" value="编辑项目" class="btn btn-primary">
      <router-link :to="`/projects`" class="btn btn-secondary">返回</router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Validations } from '@/components/simple_form'
import * as requests from '@/requests'
import _ from 'lodash'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Form from '../Form.vue'

const validations = reactive<Validations>(new Validations())
const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = params.project_id
const form = ref({
  name: null as string | null
})

const project = await new requests.ProjectShow().setup(proxy, (req) => {
  req.interpolations.project_id = _.toNumber(project_id)
}).perform()

form.value.name = project.name


async function projectUpdate(event: Event) {
  event.preventDefault()
  validations.clear()

  const form_data = new FormData(event.target as HTMLFormElement)
  try {
    await new requests.ProjectUpdate().setup(proxy, (req) => {
      req.interpolations.id = project.id
    }).perform(form_data)

    router.push(`/projects`)
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

</script>

<template>
  <PageHeader>
    <PageTitle>新增分类</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>新增分类</Button>
          <Button variant="secondary" :to="return_url">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import { useQueryLine } from '@/lib/useQueryLine'
import PathHelper from '@/lib/PathHelper'
import OkUrl from '@/lib/ok_url'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const params = route.params as any
const line = useQueryLine()
const path_info = PathHelper.parseCollection(route.path, 'new')
const ok_url = new OkUrl(route)

const return_url = computed(() => ok_url.withDefault(path_info.collection))

const former = Former.build({
  name: "",
  description: "",
  color: "#ace0ef"
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_category_action } = line.request(q.project.categories.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await create_category_action({
    interpolations: { project_id: params.project_id },
    body: former.form,
  })

  router.push(return_url.value)
}
</script>

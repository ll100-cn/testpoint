<template>
  <div class="page-header">
    <h2>标签列表</h2>
    <div class="actions ms-auto">
      <router-link class="btn btn-primary" :to="`/projects/${project_id}/test_case_labels/new`">新增标签</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="card card-x-table">
    <div class="card-body">
      <table class="table">
        <colgroup>
          <col>
          <col>
          <col>
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>标签</th>
            <th>描述</th>
            <th>案例</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <template v-for="test_case_label in test_case_labels" :key="test_case_label.id">
            <tr>
              <td>{{ test_case_label.name }}</td>
              <td>{{ test_case_label.description }}</td>
              <td>{{ test_case_label.test_case_count }}</td>
              <td class="x-actions text-end">
                <router-link :to="`/projects/${project_id}/test_case_labels/${test_case_label.id}/edit`">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" @click.prevent="onRemove(test_case_label.id)"><i class="far fa-trash-alt" /> 删除</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations } from "@/components/simple_form"
import * as requests from '@/requests'

import FormErrorAlert from "@/components/FormErrorAlert.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const validations = reactive<Validations>(new Validations())
const project_id = params.project_id

const test_case_labels = ref(await new requests.TestCaseLabelInfoList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

async function onRemove(id: number) {
  if (!confirm("是否删除标签？")) {
    return
  }

  try {
    await new requests.TestCaseLabelDestroy().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.test_case_label_id = id
    }).perform()

    router.go(0)
  } catch (error) {
    if (validations.handleError(error)) {
      return
    }

    throw error
  }
}

</script>

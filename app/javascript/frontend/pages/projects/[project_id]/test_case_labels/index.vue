<template>
  <div class="page-header">
    <h2>标签列表</h2>
    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link v-if="allow('create', TestCaseLabel)" class="btn btn-primary" :to="`/projects/${project_id}/test_case_labels/new`">新增标签</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="card page-card card-x-table">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>标签</th>
            <th>描述</th>
            <th>案例</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="test_case_label in test_case_labels" :key="test_case_label.id">
            <tr>
              <td>{{ test_case_label.name }}</td>
              <td>{{ test_case_label.description }}</td>
              <td>{{ test_case_label.test_case_count }}</td>
              <td>
                <div class="x-actions justify-content-end x-spacer-3">
                  <router-link v-if="allow('update', test_case_label)" :to="`/projects/${project_id}/test_case_labels/${test_case_label.id}/edit`">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a v-if="allow('destroy', test_case_label)" href="#" @click.prevent="onRemove(test_case_label.id)"><i class="far fa-trash-alt" /> 删除</a>
                </div>
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
import * as q from '@/lib/requests'

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { usePageStore } from '@/store'
import { TestCaseLabel } from '@/models'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const validations = reactive<Validations>(new Validations())
const project_id = params.project_id

const test_case_labels = ref(await new q.project.TestCaseLabelInfoReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

async function onRemove(id: number) {
  if (!confirm("是否删除标签？")) {
    return
  }

  try {
    await new q.project.TestCaseLabelInfoReq.Destroy().setup(proxy, (req) => {
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

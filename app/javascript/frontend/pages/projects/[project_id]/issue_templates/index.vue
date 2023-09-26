<template>
  <div class="page-header">
    <h2>问题模版列表</h2>
    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <button v-if="allow('create', IssueTemplate)" class="btn btn-primary" @click="router.push(`/projects/${project_id}/issue_templates/new`)">新增问题模版</button>
    </div>
  </div>
  <FormErrorAlert :validations="validations" />
  <div class="card page-card card-x-table">
    <div class="card-body">
      <table class="table mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>模版名称</th>
            <th>新增问题时可选</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in issue_templates" :key="item.id">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.lookup_by_build_form ? "可见" : "隐藏" }}</td>
              <td>
                <div class="x-actions justify-content-end x-spacer-3">
                  <router-link v-if="allow('update', item)" :to="`/projects/${project_id}/issue_templates/${item.id}/edit`">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a v-if="allow('destroy', item)" href="#" @click.prevent="onRemove(item.id)"><i class="far fa-trash-alt" /> 删除</a>
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
import { getCurrentInstance, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import * as q from '@/lib/requests'
import { Validations } from "@/components/simple_form"

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { usePageStore } from '@/store'
import { IssueTemplate } from '@/models'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const validations = reactive<Validations>(new Validations())
const project_id = params.project_id

const issue_templates = ref(await new q.project.IssueTemplateReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

async function onRemove(id: number) {
  if (!confirm("是否删除问题模版？")) {
    return
  }

  try {
    await new q.project.IssueTemplateReq.Destroy().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.issue_template_id = id
    }).perform()
  } catch (error) {
    if (validations.handleError(error)) {
      return
    }

    throw error
  }
}

</script>

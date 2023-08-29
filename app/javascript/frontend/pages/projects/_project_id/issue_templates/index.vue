<template>
  <div class="page-header">
    <h2>问题模版列表</h2>
    <div class="actions ms-auto">
      <button class="btn btn-primary" @click="router.push(`/projects/${project_id}/issue_templates/new`)">新增问题模版</button>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <table class="table">
        <colgroup>
          <col>
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>模版名称</th>
            <th>新建问题时可选</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in issue_templates" :key="item.id">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.lookup_by_build_form ? "可见" : "隐藏" }}</td>
              <td>
                <a href="javascript:void(0)" @click="router.push(`/projects/${project_id}/issue_templates/${item.id}/edit`)">修改</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import * as requests from '@/requests'
import * as utils from '@/lib/utils'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const project_id = ref(route.params.project_id)

const issue_templates = ref(await new requests.IssueTemplateList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id.value
}).perform())

</script>

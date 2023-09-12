<template>
  <div class="nav nav-tabs mb-4">
    <router-link to="/projects" class="nav-item nav-link active">项目</router-link>
    <router-link to="/users" class="nav-item nav-link">成员</router-link>
  </div>

  <div class="page-header">
    <h2>项目列表</h2>

    <div class="page-actions ms-auto">
      <router-link to="/projects/new" class="btn btn-primary">新增项目</router-link>
    </div>
  </div>

  <div class="card card-x-table">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>是否规定</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <template v-for="project in projects.list">
            <tr>
              <td>{{ project.id }}</td>
              <td>{{ project.name }}</td>
              <td>{{ project.archived ? "是" : "否" }}</td>
              <td class="x-actions text-end">
                <router-link :to="`/projects/${project.id}/edit`"><i class="far fa-pencil-alt" /> 修改</router-link>
                <a href="#" @click.prevent="onRemove(project.id)"><i class="far fa-trash-alt" /> 归档</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <PaginationBar2 class="mb-0 mt-2" :pagination="projects" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Validations from '@/components/simple_form/Validations'
import * as requests from '@/requests'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import PaginationBar2 from '@/components/PaginationBar2.vue'

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const validations = reactive<Validations>(new Validations())

const projects = ref(await new requests.ProjectPaginationList().setup(proxy).perform())

async function onRemove(project_id) {
  if (!confirm("是否归档项目？")) {
    return
  }

  try {
    await new requests.ProjectDestroy().setup(proxy, (req) => {
      req.interpolations.id = project_id
    }).perform()

    router.go(0)
  } catch (error) {
    if (validations.handleError(error)) {
      alert(validations.avaliableFullMessages().join("\n"))
      return
    }

    throw error
  }
}
</script>

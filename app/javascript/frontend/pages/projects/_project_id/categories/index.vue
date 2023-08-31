<template>
  <div class="page-header">
    <h2>分类列表</h2>
    <div class="actions ms-auto">
      <router-link class="btn btn-primary" :to="`/projects/${project_id}/categories/new`">新增分类</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="card app-card-main">
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
            <th>ID</th>
            <th>名称</th>
            <th>描述</th>
            <th>关联问题数</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <template v-for="category in categories.list" :key="category.id">
            <tr>
              <td>{{ category.id }}</td>
              <td>
                <span class="badge" :style="`background-color: ${category.color}`">{{ category.name }}</span>
              </td>
              <td>{{ category.description }}</td>
              <td>{{ category.issue_count }}</td>
              <td class="x-actions text-end">
                <router-link :to="`/projects/${project_id}/categories/${category.id}/edit`">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" @click.prevent="onRemove(category.id)"><i class="far fa-times" /> 删除</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <PaginationBar class="mb-0" :pagination="categories" :current-query="currentQuery" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import _ from 'lodash'
import * as requests from '@/requests'
import { Validations } from "@/components/simple_form"
import { PageQuery } from '@/types'

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import PaginationBar from "@/components/PaginationBar.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()

const validations = reactive<Validations>(new Validations())
const project_id = ref(route.params.project_id)

const currentQuery = ref<PageQuery>({
  page: _.toInteger(route.query.page) || 1,
})

const categories = ref(await new requests.CategoryInfoList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id.value
}).perform())

async function onRemove(id: number) {
  if (!confirm("是否删除分类？")) {
    return
  }

  try {
    await new requests.CategoryDestroy().setup(proxy, (req) => {
      req.interpolations.project_id = project_id.value
      req.interpolations.category_id = id
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

<template>
  <div class="page-header">
    <h2>分类列表</h2>
    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link class="btn btn-primary" :to="`/projects/${project_id}/categories/new`">新增分类</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="card page-card card-x-table">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>描述</th>
            <th>关联问题数</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="category in categories.list" :key="category.id">
            <tr>
              <td>{{ category.id }}</td>
              <td>
                <CategoryBadge :category="category" />
              </td>
              <td>{{ category.description }}</td>
              <td>{{ category.issue_count }}</td>
              <td class="x-spacer-3 text-end">
                <router-link :to="`/projects/${project_id}/categories/${category.id}/edit`">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" @click.prevent="onRemove(category.id)"><i class="far fa-trash-alt" /> 删除</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <PaginationBar :pagination="categories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import _ from 'lodash'
import * as requests from '@/lib/requests'
import { Validations } from "@/components/simple_form"
import { PageQuery } from '@/types'

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import PaginationBar from "@/components/PaginationBar.vue"
import CategoryBadge from '@/components/CategoryBadge.vue'
import PaginationBar from '@/components/PaginationBar.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const validations = reactive<Validations>(new Validations())
const project_id = params.project_id

const currentQuery = ref<PageQuery>({
  page: _.toInteger(route.query.page) || 1,
})

const categories = ref(await new requests.CategoryInfoReq.Page().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

async function onRemove(id: number) {
  if (!confirm("是否删除分类？")) {
    return
  }

  try {
    await new requests.CategoryReq.Destroy().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
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

<template>
  <div class="page-header">
    <h2>分类列表</h2>
    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link v-if="allow('create', Category)" class="btn btn-primary" :to="`/projects/${project_id}/categories/new`">新增分类</router-link>
    </div>
  </div>

  <ActionerAlert :actioner="actioner" />

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
          <template v-for="category in categories" :key="category.id">
            <tr>
              <td>{{ category.id }}</td>
              <td>
                <CategoryBadge :category="category" />
              </td>
              <td>{{ category.description }}</td>
              <td>{{ category.issue_count }}</td>
              <td>
                <div class="x-actions justify-content-end x-spacer-3">
                  <router-link v-if="allow('update', category)" :to="`/projects/${project_id}/categories/${category.id}/edit`">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a href="#" v-if="allow('destroy', category)" @click.prevent="deleteCategory(category.id)" :class="{ disabled: actioner.processing }"><i class="far fa-trash-alt" /> 删除</a>
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
import { Actioner } from '@/components/Actioner'
import ActionerAlert from '@/components/ActionerAlert.vue'
import CategoryBadge from '@/components/CategoryBadge.vue'
import * as q from '@/lib/requests'
import { Category } from '@/models'
import { usePageStore } from '@/store'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const project_id = params.project_id

const categories = ref(await new q.project.CategoryInfoReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const actioner = Actioner.build()

function deleteCategory(id: number) {
  actioner.perform(async function() {
    await new q.project.CategoryInfoReq.Destroy().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.category_id = id
    }).perform()

    router.go(0)
  })
}

</script>

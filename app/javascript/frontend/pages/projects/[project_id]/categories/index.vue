<template>
  <PageHeader>
    <PageTitle>分类列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Category)" :to="`/projects/${project_id}/categories/new`">新增分类</Button>
    </template>
  </PageHeader>

  <ActionerAlert :actioner="actioner" />

  <Card>
    <CardTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>关联问题数</TableHead>
            <TableHead role="actions"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="category_box in category_boxes" :key="category_box.category.id">
            <TableRow>
              <TableCell>{{ category_box.category.id }}</TableCell>
              <TableCell>
                <CategoryBadge :category="category_box.category" />
              </TableCell>
              <TableCell>{{ category_box.category.description }}</TableCell>
              <TableCell>{{ category_box.issue_count }}</TableCell>
              <TableCell role="actions">
                <router-link class="link" v-if="allow('update', category_box.category)" :to="`/projects/${project_id}/categories/${category_box.category.id}/edit`">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" v-if="allow('destroy', category_box.category)" @click.prevent="deleteCategory(category_box.category.id)" class="link" :class="{ disabled: actioner.processing }"><i class="far fa-trash-alt" /> 删除</a>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardTable>
  </Card>
</template>

<script setup lang="ts">
import Button from '$ui/button/Button.vue'
import { Card, CardTable } from '$ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$ui/table'
import { Actioner } from '@/components/Actioner'
import ActionerAlert from '@/components/ActionerAlert.vue'
import CategoryBadge from '@/components/CategoryBadge.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import useRequestList from '@/lib/useRequestList'
import { Category } from '@/models'
import * as q from '@/requests'
import { usePageStore } from '@/store'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow

const project_id = params.project_id

const category_page = reqs.add(q.project.categories.InfoList).setup(req => {
  req.interpolations.project_id = project_id
}).wait()
await reqs.performAll()
const category_boxes = computed(() => category_page.value.list)

const actioner = Actioner.build()

function deleteCategory(id: number) {
  actioner.perform(async function() {
    await reqs.add(q.project.categories.InfoDestroy).setup(req => {
      req.interpolations.project_id = project_id
      req.interpolations.category_id = id
    }).perform()

    router.go(0)
  })
}

const attrs = {
  'data-test': null,
}

const progress = ref(13)
</script>

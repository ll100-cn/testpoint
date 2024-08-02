<template>
  <PageHeader>
    <PageTitle>分类列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Category)" :to="`/projects/${project_id}/categories/new`">新增分类</Button>
    </template>
  </PageHeader>

  <ActionerAlert :actioner="actioner" />

  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>关联问题数</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="category in categories" :key="category.id">
            <TableRow>
              <TableCell>{{ category.id }}</TableCell>
              <TableCell>
                <CategoryBadge :category="category" />
              </TableCell>
              <TableCell>{{ category.description }}</TableCell>
              <TableCell>{{ category.issue_count }}</TableCell>
              <TableCell>
                <div class="flex justify-end space-x-3">
                  <router-link class="link" v-if="allow('update', category)" :to="`/projects/${project_id}/categories/${category.id}/edit`">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a href="#" v-if="allow('destroy', category)" @click.prevent="deleteCategory(category.id)" class="link" :class="{ disabled: actioner.processing }"><i class="far fa-trash-alt" /> 删除</a>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Actioner } from '@/components/Actioner'
import ActionerAlert from '@/components/ActionerAlert.vue'
import CategoryBadge from '@/components/CategoryBadge.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import * as q from '@/lib/requests'
import { Category } from '@/models'
import { usePageStore } from '@/store'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$vendor/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import CardBody from '../test_cases/CardBody.vue'
import Button from '$vendor/ui/button/Button.vue'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow

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

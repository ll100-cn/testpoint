<template>
  <PageHeader>
    <PageTitle>分类列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Category)" :to="ok_url.apply(`${path_info.collection}/new`)">新增分类</Button>
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
          <template v-for="{ category } in category_boxes" :key="category.id">
            <TableRow>
              <TableCell>{{ category.id }}</TableCell>
              <TableCell>
                <CategoryBadge :category="category" />
              </TableCell>
              <TableCell>{{ category.description }}</TableCell>
              <TableCell>{{ issues_counts[category.id.toString()] ?? 0 }}</TableCell>
              <TableCell role="actions">
                <router-link class="link" v-if="allow('update', category)" :to="ok_url.apply(`${path_info.collection}/${category.id}/edit`)">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" v-if="allow('destroy', category)" v-confirm="'确定操作？'" @click.prevent="deleteCategory(category.id)" class="link" :class="{ disabled: actioner.processing }"><i class="far fa-trash-alt" /> 删除</a>
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
import { Category } from '@/models'
import * as q from '@/requests'
import { usePageStore } from '@/store'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQueryLine } from '@/lib/useQueryLine'
import PathHelper from '@/lib/PathHelper'
import vConfirm from '@/components/vConfirm'
import OkUrl from '@/lib/ok_url'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const actioner = Actioner.build()
const ok_url = new OkUrl(route)

const project_id = params.project_id
const path_info = PathHelper.parseCollection(route.path, 'index')

const { data: category_page } = line.request(q.project.categories.Page(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
const category_boxes = computed(() => category_page.value.list)
const issues_counts = computed(() => category_page.value.issues_counts ?? {})

const { mutateAsync: destroy_category_action } = line.request(q.project.categories.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function deleteCategory(id: number) {
  await actioner.perform(destroy_category_action, {
    interpolations: { project_id, category_id: id }
  })
}
</script>

<template>
  <PageHeader>
    <PageTitle>项目列表</PageTitle>
    <router-link :to="ok_url.apply('/users')" class="ms-3 link">成员</router-link>

    <template #actions>
      <Button :to="ok_url.apply('/projects/new')">新增项目</Button>
    </template>
  </PageHeader>

  <Card>
    <CardTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>是否归档</TableHead>
            <TableHead>webhook_url</TableHead>
            <TableHead role="actions"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="project_box in project_page.list">
            <TableRow :class="{ 'block-discard': project_box.project.archived }">
              <TableCell>{{ project_box.project.id }}</TableCell>
              <TableCell>{{ project_box.project.name }}</TableCell>
              <TableCell>{{ project_box.project.archived ? "是" : "否" }}</TableCell>
              <TableCell>{{ project_box.project.webhook_url }}</TableCell>
              <TableCell role="actions">
                <router-link :to="ok_url.apply(`/projects/${project_box.project.id}`)" class="link"><i class="far fa-search"></i> 详情</router-link>
                <router-link :to="ok_url.apply(`/projects/${project_box.project.id}/edit`)" class="link"><i class="far fa-pencil-alt" /> 修改</router-link>
                <a href="#" v-confirm="'是否归档项目？'" @click.prevent="archiveProject(project_box.project.id)" class="link"><i class="far fa-trash-alt" /> 归档</a>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardTable>

    <CardFooter>
      <PaginationBar :pagination="project_page" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Card, CardFooter, CardTable } from '$ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$ui/table'
import { Alerter } from '@/components/Alerter'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import vConfirm from '@/components/vConfirm'
import { useQueryLine } from '@/lib/useQueryLine'
import * as utils from "@/lib/utils"
import * as q from '@/requests'
import { useRoute } from 'vue-router'
import OkUrl from '@/lib/ok_url'

const line = useQueryLine()
const route = useRoute()
const alerter = Alerter.build()
const query = utils.queryToPlain(route.query)
const ok_url = new OkUrl(route)

const { data: project_page } = line.request(q.admin.projects.Page(), (req, it) => {
  req.query = utils.plainToQuery(query)
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const { mutateAsync: destroy_project_action } = line.request(q.admin.projects.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function archiveProject(project_id: number) {
  alerter.perform(destroy_project_action, {
    interpolations: { id: project_id }
  })
}
</script>

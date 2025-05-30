<template>
  <PageHeader>
    <PageTitle>项目列表</PageTitle>
    <router-link to="/users" class="ms-3 link">成员</router-link>

    <template #actions>
      <Button to="/projects/new">新增项目</Button>
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
                <router-link :to="`/projects/${project_box.project.id}`" class="link"><i class="far fa-search"></i> 详情</router-link>
                <router-link :to="`/projects/${project_box.project.id}/edit`" class="link"><i class="far fa-pencil-alt" /> 修改</router-link>
                <a href="#" @click.prevent="onRemove(project_box.project.id)" class="link"><i class="far fa-trash-alt" /> 归档</a>
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
import { Validator } from '$ui/simple_form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$ui/table'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import useRequestList from '@/lib/useRequestList'
import * as utils from "@/lib/utils"
import * as q from '@/requests'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const reqs = useRequestList()
const router = useRouter()
const validations = reactive<Validator>(new Validator())
const route = useRoute()
const query = utils.queryToPlain(route.query)

const project_page = reqs.add(q.admin.projects.Page).setup(req => {
  req.query = utils.plainToQuery(query)
}).wait()
await reqs.performAll()

async function onRemove(project_id: number) {
  if (!confirm("是否归档项目？")) {
    return
  }

  try {
    await reqs.add(q.admin.projects.Destroy).setup(req => {
      req.interpolations.id = project_id
    }).perform()

    router.go(0)
  } catch (error) {
    validations.processError(error)
    alert(validations.errorMessages([]).join("\n"))
  }
}
</script>

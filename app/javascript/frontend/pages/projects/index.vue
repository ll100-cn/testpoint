<template>
  <PageHeader>
    <PageTitle>项目列表</PageTitle>
    <router-link to="/users" class="ms-3 link">成员</router-link>

    <template #actions>
      <Button to="/projects/new">新增项目</Button>
    </template>
  </PageHeader>

  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>是否归档</TableHead>
            <TableHead>webhook_url</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="project in projects.list">
            <TableRow :class="{ 'block-discard': project.archived }">
              <TableCell>{{ project.id }}</TableCell>
              <TableCell>{{ project.name }}</TableCell>
              <TableCell>{{ project.archived ? "是" : "否" }}</TableCell>
              <TableCell>{{ project.webhook_url }}</TableCell>
              <TableCell>
                <div class="flex justify-end space-x-3">
                  <router-link :to="`/projects/${project.id}`" class="link"><i class="far fa-search"></i> 详情</router-link>
                  <router-link :to="`/projects/${project.id}/edit`" class="link"><i class="far fa-pencil-alt" /> 修改</router-link>
                  <a href="#" @click.prevent="onRemove(project.id)" class="link"><i class="far fa-trash-alt" /> 归档</a>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>

    <CardFooter>
      <PaginationBar :pagination="projects" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import Validations from '@/components/simple_form/Validations'
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import PaginationBar from '@/components/PaginationBar.vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Button } from '@/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '@/ui'

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const validations = reactive<Validations>(new Validations())
const route = useRoute()
const query = utils.queryToPlain(route.query)

const projects = ref(await new q.admin.projects.Page().setup(proxy, req => {
  req.query = utils.plainToQuery(query)
}).perform())

async function onRemove(project_id) {
  if (!confirm("是否归档项目？")) {
    return
  }

  try {
    await new q.admin.projects.Destroy().setup(proxy, (req) => {
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

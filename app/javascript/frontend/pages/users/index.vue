<template>
  <PageHeader>
    <PageTitle>用户列表</PageTitle>
    <router-link to="/projects" class="ms-3 link">项目</router-link>

    <template #actions>
      <Button to="/users/new">新增用户</Button>
    </template>
  </PageHeader>

  <Card>
    <CardTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead role="actions"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="user_box in user_page.list">
            <TableRow>
              <TableCell>{{ user_box.user.id }}</TableCell>
              <TableCell>{{ user_box.user.name }}</TableCell>
              <TableCell>{{ user_box.user.email }}</TableCell>
              <TableCell role="actions">
                <router-link :to="`/users/${user_box.user.id}/edit`" class="link"><i class="far fa-pencil-alt" /> 修改</router-link>
                <a href="#" @click.prevent="onRemove(user_box.user.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardTable>

    <CardFooter>
      <PaginationBar :pagination="user_page" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { getCurrentInstance, reactive, ref } from 'vue'
import PaginationBar from '@/components/PaginationBar.vue'
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import * as utils from "@/lib/utils"
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Button } from '$ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTable, CardTitle, CardTopState } from '$ui/card'
import { Validator } from '$ui/simple_form'

const reqs = useRequestList()
const router = useRouter()
const route = useRoute()
const validations = reactive(new Validator())
const query = utils.queryToPlain(route.query)

const user_page = reqs.add(q.admin.users.Page).setup(req => {
  req.query = utils.plainToQuery(query)
}).wait()
await reqs.performAll()

async function onRemove(user_id: number) {
  if (!confirm("是否删除用户？")) {
    return
  }

  try {
    await reqs.add(q.admin.users.Destroy).setup(req => {
      req.interpolations.id = user_id
    }).perform()

    router.go(0)
  } catch (error) {
    validations.processError(error)
    alert(validations.errorMessages([]).join("\n"))
  }
}
</script>

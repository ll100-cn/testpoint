<template>
  <PageHeader>
    <PageTitle>用户列表</PageTitle>
    <router-link to="/projects" class="ms-3 link">项目</router-link>

    <template #actions>
      <Button to="/users/new">新增用户</Button>
    </template>
  </PageHeader>

  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="user in users.list">
            <TableRow>
              <TableCell>{{ user.id }}</TableCell>
              <TableCell>{{ user.name }}</TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>
                <div class="flex justify-end space-x-3">
                  <router-link :to="`/users/${user.id}/edit`" class="link"><i class="far fa-pencil-alt" /> 修改</router-link>
                  <a href="#" @click.prevent="onRemove(user.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>

    <CardFooter>
      <PaginationBar :pagination="users" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import useRequestList from '@bbb/useRequestList'
import { getCurrentInstance, reactive, ref } from 'vue'
import PaginationBar from '@/components/PaginationBar.vue'
import Validations from '@/components/simple_form/Validations';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import * as utils from "@/lib/utils"
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Button } from '$ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'

const reqs = useRequestList()
const router = useRouter()
const route = useRoute()
const validations = reactive<Validations>(new Validations())
const query = utils.queryToPlain(route.query)

const users = reqs.add(q.admin.users.Page).setup(req => {
  req.query = utils.plainToQuery(query)
}).wait()
await reqs.performAll()

async function onRemove(user_id) {
  if (!confirm("是否删除用户？")) {
    return
  }

  try {
    await reqs.add(q.admin.users.Destroy).setup(req => {
      req.interpolations.id = user_id
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

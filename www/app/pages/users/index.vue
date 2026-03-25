<template>
  <PageHeader>
    <PageTitle>用户列表</PageTitle>
    <router-link :to="ok_url.apply('/projects')" class="ms-3 link">项目</router-link>

    <template #actions>
      <Button :to="ok_url.apply('/users/new')">新增用户</Button>
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
                <router-link :to="ok_url.apply(`/users/${user_box.user.id}/edit`)" class="link"><i class="far fa-pencil-alt" /> 修改</router-link>
                <a href="#" v-confirm="'是否删除用户？'" @click.prevent="deleteUser(user_box.user.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
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
import { useQueryLine } from '@/lib/useQueryLine'
import vConfirm from '@/components/vConfirm'
import { Alerter } from '@/components/Alerter';
import OkUrl from '@/lib/ok_url'

const line = useQueryLine()
const router = useRouter()
const route = useRoute()
const validations = reactive(new Validator())
const query = utils.queryToPlain(route.query)
const alerter = Alerter.build()
const ok_url = new OkUrl(route)

const { data: user_page } = line.request(q.admin.users.Page(), (req, it) => {
  req.query = utils.plainToQuery(query)
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const { mutateAsync: destroy_user_action } = line.request(q.admin.users.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function deleteUser(user_id: number) {
  await alerter.perform(destroy_user_action, {
    interpolations: { id: user_id }
  })
}
</script>

<template>
  <PageHeader>
    <PageTitle>用户列表</PageTitle>
    <router-link to="/projects" class="ms-3">项目</router-link>

    <template #actions>
      <router-link to="/users/new" class="btn btn-primary">新增用户</router-link>
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
                <div class="x-actions justify-content-end x-spacer-3">
                  <router-link :to="`/users/${user.id}/edit`"><i class="far fa-pencil-alt" /> 修改</router-link>
                  <a href="#" @click.prevent="onRemove(user.id)"><i class="far fa-trash-alt" /> 删除</a>
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
import { getCurrentInstance, reactive, ref } from 'vue'
import PaginationBar from '@/components/PaginationBar.vue'
import Validations from '@/components/simple_form/Validations';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import * as utils from "@/lib/utils"
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$vendor/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const route = useRoute()
const validations = reactive<Validations>(new Validations())
const query = utils.queryToPlain(route.query)

const users = ref(await new q.admin.UserReq.Page().setup(proxy, req => {
  req.query = utils.plainToQuery(query)
}).perform())

async function onRemove(user_id) {
  if (!confirm("是否删除用户？")) {
    return
  }

  try {
    await new q.admin.UserReq.Destroy().setup(proxy, (req) => {
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
<template>
  <PageHeader>
    <PageTitle>项目成员列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Member)" :to="`/projects/${project_id}/members/new`">新增成员</Button>
    </template>
  </PageHeader>

  <FormErrorAlert :validator="validator" />

  <Nav v-model:model-value="active">
    <NavList preset="tabs">
      <NavItem value="normal">正常</NavItem>
      <NavItem value="archived">归档</NavItem>
    </NavList>
  </Nav>

  <Card v-for="(group, key) in grouped_members" class="rounded-ss-none" :class="{ hidden: key != active }">
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>角色</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="member in group" :key="member.id">
            <TableRow :class="{ 'block-discard': member.archived_at }">
              <TableCell>{{ member.id }}</TableCell>
              <TableCell>{{ member.name }}</TableCell>
              <TableCell>{{ member.user.email }}</TableCell>
              <TableCell>{{ member.role_text }}</TableCell>
              <TableCell>
                <div class="flex justify-end space-x-3">
                  <router-link v-if="allow('update', member)" :to="`/projects/${project_id}/members/${member.id}/edit`" class="link">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a href="#" v-if="allow('archive', member)" @click.prevent="onArchive(member.id)" class="link"><i class="far fa-archive" /> 归档</a>
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
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as q from '@/lib/requests'
import { Member } from '@/models'
import { usePageStore } from '@/store'
import { type PageQuery } from '@/types'
import _ from 'lodash'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as h from '@/lib/humanize'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '@/ui'
import Validator from '@/ui/simple_form/Validator';
import Button from "@/ui/button/Button.vue"
import { Nav, NavList, NavItem } from '@/ui'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow

const active = ref('normal')

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id

const currentQuery = ref<PageQuery>({
  page: _.toInteger(route.query.page) || 1,
})

const members = ref(await new q.project.members.InfoList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = currentQuery.value
}).perform())

const grouped_members = ref(_.groupBy(members.value, (member) => {
  return member.archived_at ? "archived" : "normal"
}))
console.log(grouped_members.value)

async function onArchive(id: number) {
  if (!confirm("是否归档成员？")) {
    return
  }

  try {
    await new q.project.members.Archive().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.member_id = id
    }).perform()

    router.go(0)
  } catch (error) {
    if (validator.processError(error)) {
      return
    }

    throw error
  }
}

</script>

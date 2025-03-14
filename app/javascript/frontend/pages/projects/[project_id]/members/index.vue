<template>
  <PageHeader>
    <PageTitle>项目成员列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Member)" :to="`/projects/${project_id}/members/new`">新增成员</Button>
    </template>
  </PageHeader>

  <FormErrorAlert :validator="validator" />

  <Nav preset="tabs" v-model="active">
    <NavItem value="normal">正常</NavItem>
    <NavItem value="archived">归档</NavItem>
  </Nav>

  <Card v-for="(group, key) in grouped_members" class="rounded-ss-none" :class="{ hidden: key != active }">
    <CardTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>角色</TableHead>
            <TableHead role="actions"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="member in group" :key="member.id">
            <TableRow :class="{ 'block-discard': member.archived_at }">
              <TableCell>{{ member.id }}</TableCell>
              <TableCell>{{ member.name }}</TableCell>
              <TableCell>{{ member.user.email }}</TableCell>
              <TableCell>{{ member.role_text }}</TableCell>
              <TableCell role="actions">
                <router-link v-if="allow('update', member)" :to="`/projects/${project_id}/members/${member.id}/edit`" class="link">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" v-if="allow('archive', member)" @click.prevent="onArchive(member.id)" class="link"><i class="far fa-archive" /> 归档</a>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardTable>
  </Card>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { Member } from '@/models'
import { usePageStore, useSessionStore } from '@/store'
import _ from 'lodash'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Card, CardContent, CardTable } from '$ui/card'
import { Validator } from '$ui/simple_form'
import Button from "$ui/button/Button.vue"
import { Nav, NavItem } from '$ui/nav'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const session = useSessionStore()

const active = ref('normal')

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id

const members = reqs.raw(session.request(q.project.members.InfoList, project_id)).setup().wait()
await reqs.performAll()

const grouped_members = ref(_.groupBy(members.value, (member) => {
  return member.archived_at ? "archived" : "normal"
}))

async function onArchive(id: number) {
  if (!confirm("是否归档成员？")) {
    return
  }

  try {
    await reqs.add(q.project.members.Archive).setup(req => {
      req.interpolations.project_id = project_id
      req.interpolations.member_id = id
    }).perform()

    router.go(0)
  } catch (error) {
    validator.processError(error)
  }
}

</script>

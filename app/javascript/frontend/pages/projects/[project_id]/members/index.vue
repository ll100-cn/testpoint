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

  <Card v-for="(group, key) in grouped_member_boxes" class="rounded-ss-none" :class="{ hidden: key != active }">
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
          <template v-for="member_box in group" :key="member_box.member.id">
            <TableRow :class="{ 'block-discard': member_box.member.archived_at }">
              <TableCell>{{ member_box.member.id }}</TableCell>
              <TableCell>{{ member_box.member.name }}</TableCell>
              <TableCell>{{ member_box.user!.email }}</TableCell>
              <TableCell>{{ member_box.member.role_text }}</TableCell>
              <TableCell role="actions">
                <router-link v-if="allow('update', member_box.member)" :to="`/projects/${project_id}/members/${member_box.member.id}/edit`" class="link">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" v-if="allow('archive', member_box.member)" @click.prevent="onArchive(member_box.member.id)" class="link"><i class="far fa-archive" /> 归档</a>
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
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const session = useSessionStore()

const active = ref('normal')

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id

const { data: member_page } = line.request(q.project.members.InfoList, (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const grouped_member_boxes = ref(_.groupBy(member_page.value.list, (member_box) => {
  return member_box.member.archived_at ? "archived" : "normal"
}))

const { mutateAsync: archive_member_action } = line.request(q.project.members.Archive, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function onArchive(id: number) {
  if (!confirm("是否归档成员？")) {
    return
  }

  try {
    await archive_member_action({
      interpolations: { project_id, member_id: id }
    })

    router.go(0)
  } catch (error) {
    validator.processError(error)
  }
}

</script>

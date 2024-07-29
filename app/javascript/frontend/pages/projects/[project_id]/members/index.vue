<template>
  <PageHeader>
    <PageTitle>项目成员列表</PageTitle>

    <template #actions>
      <router-link v-if="allow('create', Member)" class="btn btn-primary" :to="`/projects/${project_id}/members/new`">新增成员</router-link>
    </template>
  </PageHeader>

  <FormErrorAlert :validator="validator" />

  <div class="nav nav-tabs mb-n1px position-relative zindex-999">
    <a href="#" class="nav-link active" data-bs-toggle="tab" data-bs-target="#normal_card">正常</a>
    <a href="#" class="nav-link" data-bs-toggle="tab" data-bs-target="#archived_card">归档</a>
  </div>

  <div class="tab-content">
    <Card v-for="(group, key) in grouped_members" :id="`${key}_card`" class="rounded-top-left-0 tab-pane fade" :class="{ show: key == 'normal', active: key == 'normal' }">
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
                  <div class="x-actions justify-content-end x-spacer-3">
                    <router-link v-if="allow('update', member)" :to="`/projects/${project_id}/members/${member.id}/edit`">
                      <i class="far fa-pencil-alt" /> 修改
                    </router-link>
                    <a href="#" v-if="allow('archive', member)" @click.prevent="onArchive(member.id)"><i class="far fa-archive" /> 归档</a>
                  </div>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as q from '@/lib/requests'
import { Member } from '@/models'
import { usePageStore } from '@/store'
import { PageQuery } from '@/types'
import _ from 'lodash'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as h from '@/lib/humanize'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$vendor/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import Validator from '$vendor/ui/simple_form/Validator';

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id

const currentQuery = ref<PageQuery>({
  page: _.toInteger(route.query.page) || 1,
})

const members = ref(await new q.project.MemberInfoReq.List().setup(proxy, (req) => {
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
    await new q.project.MemberReq.Archive().setup(proxy, (req) => {
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

<template>
  <PageHeader>
    <PageTitle>里程碑列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Milestone)" :to="`/projects/${project_id}/milestones/new`">新增里程碑</Button>
    </template>
  </PageHeader>

  <Nav preset="tabs" v-model="active">
    <NavItem v-for="key in [ 'normal', 'archived' ]" :key="key" :value="key">
      {{ key === 'normal' ? '正常' : '归档' }}
    </NavItem>
  </Nav>

  <Card v-for="(group, key) in grouped_milestones" class="rounded-ss-none" :class="{ hidden: key != active }">
    <CardTable>
      <Table>
        <colgroup>
          <col>
          <col>
          <col width="30%">
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead>标题</TableHead>
            <TableHead>发布时间</TableHead>
            <TableHead>描述</TableHead>
            <TableHead role="actions"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="milestone_box in group" :key="milestone_box.milestone.id" :class="{ 'block-discard': milestone_box.milestone.isPublished() }">
            <TableCell>{{ milestone_box.milestone.title }}</TableCell>
            <TableCell>{{ h.datetime(milestone_box.milestone.published_at ?? null) }}</TableCell>
            <TableCell>
              <PageContent :content="milestone_box.milestone.description ?? ''" />
            </TableCell>
            <TableCell role="actions">
              <router-link v-if="allow('update', milestone_box.milestone)" :to="`/projects/${project_id}/milestones/${milestone_box.milestone.id}/edit`" class="link">
                <i class="far fa-pencil-alt" /> 修改
              </router-link>

              <a v-if="milestone_box.milestone.archived_at === null && allow('archive', milestone_box.milestone)" href="#" @click.prevent="milestoneArchive(milestone_box.milestone)" class="link"><i class="far fa-archive"></i> 归档</a>
              <a v-if="milestone_box.milestone.archived_at && allow('active', milestone_box.milestone)" href="#" @click.prevent="milestoneActive(milestone_box.milestone)" class="link"><i class="far fa-box-up"></i> 取消归档</a>
              <a v-if="allow('destroy', milestone_box.milestone)" href="#" @click.prevent="milestoneDestroy(milestone_box.milestone)" class="link"><i class="far fa-trash-alt"></i> 删除</a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardTable>
  </Card>
</template>

<script setup lang="ts">
import * as h from '@/lib/humanize'
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { Milestone } from '@/models'
import { usePageStore, useSessionStore } from '@/store'
import _ from 'lodash'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Card, CardContent, CardTable } from '$ui/card'
import { Nav, NavItem } from '$ui/nav'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import Button from '$ui/button/Button.vue'
import PageContent from '@/components/PageContent.vue'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const session = useSessionStore()

const active = ref('normal')

const project_id = _.toNumber(params.project_id)

const milestone_page = reqs.raw(session.request(q.project.milestones.List, project_id)).setup().wait()
await reqs.performAll()

const grouped_milestones = ref(_.groupBy(milestone_page.value.list, (m) => m.milestone.archived_at ? 'archived' : 'normal'))

function milestoneDestroy(milestone: Milestone) {
  if (!confirm('确定要删除吗？')) {
    return
  }

  reqs.add(q.project.milestones.Destroy).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

function milestoneArchive(milestone: Milestone) {
  if (!confirm('确定要归档吗？')) {
    return
  }

  reqs.add(q.project.milestones.Archive).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

function milestoneActive(milestone: Milestone) {
  if (!confirm('确定要取消归档吗？')) {
    return
  }

  reqs.add(q.project.milestones.Active).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

</script>

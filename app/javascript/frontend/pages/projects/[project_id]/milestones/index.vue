<template>
  <PageHeader>
    <PageTitle>里程碑列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Milestone)" :to="`/projects/${project_id}/milestones/new`">新增里程碑</Button>
    </template>
  </PageHeader>

  <Nav v-model:model-value="active">
    <NavList preset="tabs">
      <NavItem v-for="key in [ 'normal', 'archived' ]" :key="key" :value="key">
        {{ key === 'normal' ? '正常' : '归档' }}
      </NavItem>
    </NavList>
  </Nav>

  <Card v-for="(group, key) in grouped_milestones" class="rounded-ss-none" :class="{ hidden: key != active }">
    <CardContent>
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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="milestone in group" :key="milestone.id" :class="{ 'block-discard': milestone.isPublished() }">
            <TableCell>{{ milestone.title }}</TableCell>
            <TableCell>{{ h.datetime(milestone.published_at) }}</TableCell>
            <TableCell>
              <textarea :value="milestone.description" data-controller="markdown" readonly class="hidden" />
            </TableCell>
            <TableCell>
              <div class="flex justify-end space-x-3">
                <router-link v-if="allow('update', milestone)" :to="`/projects/${project_id}/milestones/${milestone.id}/edit`" class="link">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>

                <a v-if="milestone.archived_at === null && allow('archive', milestone)" href="#" @click.prevent="milestoneArchive(milestone)" class="link"><i class="far fa-archive"></i> 归档</a>
                <a v-if="milestone.archived_at && allow('active', milestone)" href="#" @click.prevent="milestoneActive(milestone)" class="link"><i class="far fa-box-up"></i> 取消归档</a>
                <a v-if="allow('destroy', milestone)" href="#" @click.prevent="milestoneDestroy(milestone)" class="link"><i class="far fa-trash-alt"></i> 删除</a>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import * as h from '@/lib/humanize'
import * as q from '@/requests'
import { Milestone } from '@/models'
import { usePageStore } from '@/store'
import _ from 'lodash'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$vendor/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import { Nav, NavList, NavItem } from '$vendor/ui'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import Button from '$vendor/ui/button/Button.vue'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow

const active = ref('normal')

const project_id = _.toNumber(params.project_id)
const milestones = ref(await page.inProject()!.request(q.project.MilestoneReq.List).setup(proxy).perform())
const grouped_milestones = ref(_.groupBy(milestones.value, (m) => m.archived_at ? 'archived' : 'normal'))

function milestoneDestroy(milestone: Milestone) {
  if (!confirm('确定要删除吗？')) {
    return
  }

  new q.project.MilestoneReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

function milestoneArchive(milestone: Milestone) {
  if (!confirm('确定要归档吗？')) {
    return
  }

  new q.project.MilestoneReq.Archive().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

function milestoneActive(milestone: Milestone) {
  if (!confirm('确定要取消归档吗？')) {
    return
  }

  new q.project.MilestoneReq.Active().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

</script>

<template>
  <PageHeader>
    <PageTitle>平台列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Platform)" :to="`/projects/${project_id}/platforms/new`">新增平台</Button>
    </template>
  </PageHeader>

  <FormErrorAlert :validator="validator" />

  <Card>
    <CardTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>svg图标</TableHead>
            <TableHead>建议工单受理人</TableHead>
            <TableHead role="actions"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="platform_box in platform_boxes" :key="platform_box.platform.id">
            <TableRow>
              <TableCell>{{ platform_box.platform.name }}</TableCell>
              <TableCell>
                <PlatformBadge :platform="platform_box.platform" />
              </TableCell>
              <TableCell>{{ _.find(member_boxes, { member: { id: platform_box.platform.default_assignee_id } })?.member.name ?? "无" }}</TableCell>
              <TableCell role="actions">
                <router-link v-if="allow('update', platform_box.platform)" :to="`/projects/${project_id}/platforms/${platform_box.platform.id}/edit`" class="link">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a v-if="allow('destroy', platform_box.platform)" href="#" @click.prevent="onRemove(platform_box.platform.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardTable>
  </Card>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import useRequestList from '@/lib/useRequestList'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/requests'
import _ from 'lodash'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { usePageStore, useSessionStore } from '@/store'
import { Platform } from '@/models'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTable, CardTitle, CardTopState } from '$ui/card'
import { Validator } from '$ui/simple_form'
import Button from '$ui/button/Button.vue'
import PlatformBadge from '@/components/PlatformBadge.vue'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const session = useSessionStore()

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id

const platform_page = reqs.add(q.project.platforms.List).setup(req => {
  req.interpolations.project_id = project_id
}).wait()
const member_page = reqs.raw(session.request(q.project.members.InfoList, project_id)).setup().wait()
await reqs.performAll()
const member_boxes = computed(() => member_page.value.list)
const platform_boxes = computed(() => platform_page.value.list)

async function onRemove(id: number) {
  if (!confirm("是否删除平台？")) {
    return
  }

  try {
    await reqs.add(q.project.platforms.Destroy).setup(req => {
      req.interpolations.project_id = project_id
      req.interpolations.platform_id = id
    }).perform()

    router.go(0)
  } catch (error) {
    validator.processError(error)
  }
}

</script>

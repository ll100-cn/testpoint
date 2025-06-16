<template>
  <PageHeader>
    <PageTitle>平台列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Platform)" :to="`${path_info.collection}/new`">新增平台</Button>
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
          <template v-for="{ platform } in platform_boxes" :key="platform.id">
            <TableRow>
              <TableCell>{{ platform.name }}</TableCell>
              <TableCell>
                <PlatformBadge :platform="platform" />
              </TableCell>
              <TableCell>{{ _.find(member_boxes, { member: { id: platform.default_assignee_id } })?.member.name ?? "无" }}</TableCell>
              <TableCell role="actions">
                <router-link v-if="allow('update', platform)" :to="`${path_info.collection}/${platform.id}/edit`" class="link">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a v-if="allow('destroy', platform)" href="#" v-confirm="'是否删除平台？'" @click.prevent="deletePlatform(platform.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
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
import { useQueryLine } from '@/lib/useQueryLine'
import PageContent from '@/components/PageContent.vue'
import PathHelper from '@/lib/PathHelper'
import vConfirm from '@/components/vConfirm'
import { Alerter } from '@/components/Alerter'

const line = useQueryLine()
const route = useRoute()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const session = useSessionStore()
const alerter = Alerter.build()

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id
const path_info = PathHelper.parseCollection(route.path, 'index')

const { data: platform_boxes } = line.request(q.project.platforms.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: member_boxes } = line.request(q.project.members.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const { mutateAsync: destroy_platform_action } = line.request(q.project.platforms.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function deletePlatform(id: number) {
  await alerter.perform(destroy_platform_action, {
    interpolations: { project_id, platform_id: id }
  })
}

</script>

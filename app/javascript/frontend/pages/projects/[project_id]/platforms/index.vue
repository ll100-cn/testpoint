<template>
  <PageHeader>
    <PageTitle>平台列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Platform)" :to="`/projects/${project_id}/platforms/new`">新增平台</Button>
    </template>
  </PageHeader>

  <FormErrorAlert :validator="validator" />

  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>建议工单受理人</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="platform in platforms" :key="platform.id">
            <TableRow>
              <TableCell>{{ platform.name }}</TableCell>
              <TableCell>{{ _.find(members, { id: platform.default_assignee_id })?.name ?? "无" }}</TableCell>
              <TableCell>
                <div class="flex justify-end space-x-3">
                  <router-link v-if="allow('update', platform)" :to="`/projects/${project_id}/platforms/${platform.id}/edit`" class="link">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a v-if="allow('destroy', platform)" href="#" @click.prevent="onRemove(platform.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
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
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/lib/requests'
import _ from 'lodash'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { usePageStore } from '@/store'
import { Platform } from '@/models'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$vendor/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import Validator from '$vendor/ui/simple_form/Validator';
import Button from '$vendor/ui/button/Button.vue'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id

const platforms = ref(await new q.project.PlatformReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const members = ref(await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform())

async function onRemove(id: number) {
  if (!confirm("是否删除平台？")) {
    return
  }

  try {
    await new q.project.PlatformReq.Destroy().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.platform_id = id
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

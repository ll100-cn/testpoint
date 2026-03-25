<template>
  <PageHeader>
    <PageTitle>问题模版列表</Pagetitle>

    <template #actions>
      <Button v-if="allow('create', IssueTemplate)" :to="ok_url.apply(`${path_info.collection}/new`)">新增问题模版</Button>
    </template>
  </PageHeader>

  <ActionerAlert :actioner="actioner" />

  <Card>
    <CardTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>模版名称</TableHead>
            <TableHead>新增问题时可选</TableHead>
            <TableHead role="actions"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="{ issue_template } in issue_template_boxes" :key="issue_template.id">
            <TableRow>
              <TableCell>{{ issue_template.id }}</TableCell>
              <TableCell>{{ issue_template.name }}</TableCell>
              <TableCell>{{ issue_template.lookupByBuildForm ? "可见" : "隐藏" }}</TableCell>
              <TableCell role="actions">
                <router-link class="link" v-if="allow('update', issue_template)" :to="ok_url.apply(`${path_info.collection}/${issue_template.id}/edit`)">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a v-if="allow('destroy', issue_template)" href="#" v-confirm="'是否删除问题模版？'" @click.prevent="deleteIssueTemplate(issue_template.id)" class="link">
                  <i class="far fa-trash-alt" /> 删除
                </a>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardTable>
  </Card>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/requests'
import { Validator } from '$ui/simple_form';
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { usePageStore } from '@/store'
import { IssueTemplate } from '@/models'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTable, CardTitle, CardTopState } from '$ui/card'
import Button from '$ui/button/Button.vue';
import { useQueryLine } from '@/lib/useQueryLine'
import PathHelper from '@/lib/PathHelper'
import OkUrl from '@/lib/ok_url'
import vConfirm from '@/components/vConfirm'
import { Actioner } from '@/components/Actioner';
import ActionerAlert from '@/components/ActionerAlert.vue';

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const actioner = Actioner.build()

const project_id = params.project_id
const path_info = PathHelper.parseCollection(route.path, 'index')
const ok_url = new OkUrl(route)

const { data: issue_template_boxes } = line.request(q.project.issue_templates.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const { mutateAsync: destroy_issue_template_action } = line.request(q.project.issue_templates.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function deleteIssueTemplate(id: number) {
  await actioner.perform(destroy_issue_template_action, {
    interpolations: { project_id, issue_template_id: id }
  })
}

</script>

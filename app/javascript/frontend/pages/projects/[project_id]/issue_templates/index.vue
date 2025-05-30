<template>
  <PageHeader>
    <PageTitle>问题模版列表</Pagetitle>

    <template #actions>
      <Button v-if="allow('create', IssueTemplate)" @click.prevent="router.push(`/projects/${project_id}/issue_templates/new`)">新增问题模版</Button>
    </template>
  </PageHeader>

  <FormErrorAlert :validator="validator" />

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
          <template v-for="box in issue_template_boxes" :key="box.issue_template.id">
            <TableRow>
              <TableCell>{{ box.issue_template.id }}</TableCell>
              <TableCell>{{ box.issue_template.name }}</TableCell>
              <TableCell>{{ box.issue_template.lookup_by_build_form ? "可见" : "隐藏" }}</TableCell>
              <TableCell role="actions">
                <router-link class="link" v-if="allow('update', box.issue_template)" :to="`/projects/${project_id}/issue_templates/${box.issue_template.id}/edit`">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a v-if="allow('destroy', box.issue_template)" href="#" @click.prevent="onRemove(box.issue_template.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
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
import useRequestList from '@/lib/useRequestList'
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

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id

const issue_template_page = reqs.add(q.project.issue_templates.List).setup(req => {
  req.interpolations.project_id = project_id
}).wait()
await reqs.performAll()
const issue_template_boxes = computed(() => issue_template_page.value.list)

async function onRemove(id: number) {
  if (!confirm("是否删除问题模版？")) {
    return
  }

  try {
    await reqs.add(q.project.issue_templates.Destroy).setup(req => {
      req.interpolations.project_id = project_id
      req.interpolations.issue_template_id = id
    }).perform()
  } catch (error) {
    validator.processError(error)
  }
}

</script>

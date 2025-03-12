<template>
  <PageHeader>
    <PageTitle>标签列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', TestCaseLabel)" :to="`/projects/${project_id}/test_case_labels/new`">新增标签</Button>
    </template>
  </PageHeader>

  <FormErrorAlert :validator="validator" />

  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>标签</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>案例</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="test_case_label in test_case_labels" :key="test_case_label.id">
            <TableRow>
              <TableCell>{{ test_case_label.name }}</TableCell>
              <TableCell>{{ test_case_label.description }}</TableCell>
              <TableCell>{{ test_case_label.test_case_count }}</TableCell>
              <TableCell>
                <div class="flex justify-end space-x-3">
                  <router-link v-if="allow('update', test_case_label)" :to="`/projects/${project_id}/test_case_labels/${test_case_label.id}/edit`" class="link">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a v-if="allow('destroy', test_case_label)" href="#" @click.prevent="onRemove(test_case_label.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
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
import { reactive } from 'vue'
import useRequestList from '@/lib/useRequestList'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/requests'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { usePageStore } from '@/store'
import { TestCaseLabel } from '@/models'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Button } from '$ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import { Validator } from '$ui/simple_form'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id

const test_case_labels = reqs.add(q.project.test_case_labels.InfoList).setup(req => {
  req.interpolations.project_id = project_id
}).wait()
await reqs.performAll()

async function onRemove(id: number) {
  if (!confirm("是否删除标签？")) {
    return
  }

  try {
    await reqs.add(q.project.test_case_labels.InfoDestroy).setup(req => {
      req.interpolations.project_id = project_id
      req.interpolations.test_case_label_id = id
    }).perform()

    router.go(0)
  } catch (error) {
    validator.processError(error)
  }
}

</script>

<template>
  <PageHeader>
    <PageTitle>标签列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', TestCaseLabel)" :to="`${path_info.collection}/new`">新增标签</Button>
    </template>
  </PageHeader>

  <FormErrorAlert :validator="validator" />

  <Card>
    <CardTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>标签</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>案例</TableHead>
            <TableHead role="actions"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="{test_case_label} in test_case_label_page.list" :key="test_case_label.id">
            <TableRow>
              <TableCell>{{ test_case_label.name }}</TableCell>
              <TableCell>{{ test_case_label.description }}</TableCell>
              <TableCell>{{ cases_counts[test_case_label.id.toString()] }}</TableCell>
              <TableCell role="actions">
                <router-link v-if="allow('update', test_case_label)" :to="`${path_info.collection}/${test_case_label.id}/edit`" class="link">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a v-if="allow('destroy', test_case_label)" href="#" @click.prevent="onRemove(test_case_label.id)" class="link"><i class="far fa-trash-alt" /> 删除</a>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardTable>
  </Card>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/requests'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { usePageStore } from '@/store'
import { TestCaseLabel } from '@/models'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Button } from '$ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTable, CardTitle, CardTopState } from '$ui/card'
import { Validator } from '$ui/simple_form'
import { useQueryLine } from '@/lib/useQueryLine'
import PageContent from '@/components/PageContent.vue'
import PathHelper from '@/lib/PathHelper'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow

const validator = reactive<Validator>(new Validator())
const project_id = params.project_id
const path_info = PathHelper.parseCollection(route.path, 'index')

const { data: test_case_label_page } = line.request(q.project.test_case_labels.Page(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
const cases_counts = computed(() => test_case_label_page.value.cases_counts)

const { mutateAsync: destroy_test_case_label_action } = line.request(q.project.test_case_labels.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function onRemove(id: number) {
  if (!confirm("是否删除标签？")) {
    return
  }

  try {
    await destroy_test_case_label_action({
      interpolations: { project_id, test_case_label_id: id }
    })

    router.go(0)
  } catch (error) {
    validator.processError(error)
  }
}

</script>

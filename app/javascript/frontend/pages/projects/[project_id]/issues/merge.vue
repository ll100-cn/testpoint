<template>
  <PageHeader>
    <PageTitle>合并问题</PageTitle>
  </PageHeader>

  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>标题</TableHead>
          <TableHead>创建人</TableHead>
          <TableHead>状态</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="issue in issues" :key="issue.id" :class="{ 'block-discard': issue.archived_at }">
          <TableCell>{{ issue.id }}</TableCell>
          <TableCell>
            <router-link class="link" :to="`/projects/${issue.project_id}/issues/${issue.id}`">
              <span v-if="issue.priority === 'important'">!!</span>
              {{ issue.title }}
            </router-link>
          </TableCell>
          <TableCell>{{ issue.creator?.name }}</TableCell>
          <TableCell><IssueStateBadge :state="issue.state" /></TableCell>
          <TableCell class="text-right">
            <button @click="removeSource(issue)"><i class="far fa-trash-alt"></i></button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colspan="5">
            <button class="link" @click="newSource">
              <i class="far fa-plus fa-fw" /> 添加工单
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <Button v-if="allow('manage', Issue)" variant="primary" @click="merge" :disabled="issues.length < 2">
        <i class="far fa-object-group"></i> 合并
      </Button>
    </CardFooter>
  </Card>

  <Dialog v-model:open="add_dialog_open">
    <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>添加工单</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="source_id" label="工单ID">
          <controls.number />
        </FormGroup>
      </div>
      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>确定</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button, Former, FormFactory, UnprocessableEntityError } from '$vendor/ui'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$vendor/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import { Issue } from "@/models"
import _ from 'lodash'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/requests'
import BlankDialog from '$vendor/ui/BlankDialog.vue'
import AddIssueDialogContent from './AddIssueDialogContent.vue'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'
import IssueStateBadge from '@/components/IssueStateBadge.vue'
import { AxiosError } from 'axios'
import { usePageStore } from '@/store'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = route.query as any
const page = usePageStore()
const allow = page.inProject()!.allow

const project_id = _.toInteger(params.project_id)
const add_dialog_open = ref(false)

const issues = ref([] as Issue[])

if (!_.isEmpty(query.source_id)) {
  const issue = await new q.bug.IssueReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = query.source_id
  }).perform()

  issues.value.push(issue)
}

function newSource() {
  add_dialog_open.value = true
}

function removeSource(issue: Issue) {
  if (!confirm("确认删除？")) {
    return
  }

  issues.value = issues.value.filter(i => i.id !== issue.id)
}

const former = Former.build({
  source_id: undefined,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  if (!former.form.source_id) {
    former.validator.get('source_id').invalid(['请输入工单ID'])
    return
  }

  if (issues.value.find(issue => issue.id === former.form.source_id)) {
    former.validator.get('source_id').invalid(['工单已添加'])
    return
  }

  try {
    const issue = await new q.bug.IssueReq.Get().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.issue_id = former.form.source_id
    }).perform()

    issues.value.push(issue)

    add_dialog_open.value = false
  } catch(e) {
    if (e instanceof AxiosError && e.response?.status === 404) {
      former.validator.get('source_id').invalid(['工单不存在'])
      return
    }

    throw e
  }
}

async function merge() {
  if (!confirm("确认合并？")) {
    return
  }

  try {
    const issue = await new q.bug.IssueReq.Merge().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.query = { source_ids: _.union(issues.value.map(issue => issue.id)) }
    }).perform()

    router.push(`/projects/${project_id}/issues/${issue.id}`)
  } catch(e) {
    if (e instanceof UnprocessableEntityError) {
      alert(e.errors.errorMessages.join("\n"))
      return
    }

    throw e
  }
}
</script>

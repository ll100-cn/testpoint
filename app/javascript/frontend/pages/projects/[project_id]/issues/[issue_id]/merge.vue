<template>
  <PageHeader>
    <PageTitle>合并问题</PageTitle>
  </PageHeader>

  <Card>
    <CardTable>
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
            <router-link class="link" :to="ok_url.apply(path_info.resource)">
              <span v-if="issue.priority === 'important'">!!</span>
              {{ issue.title }}
            </router-link>
          </TableCell>
          <TableCell>{{ issue.creator?.name }}</TableCell>
          <TableCell><IssueStateBadge :state="issue.state" /></TableCell>
          <TableCell class="text-right">
            <button v-if="issue.id !== head.issue.id" v-confirm="'确认删除？'" @click.prevent="deleteSource(issue)"><i class="far fa-trash-alt"></i></button>
            <span v-else><i class="far fa-check-circle"></i> 主工单</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colspan="5">
            <button class="link" @click.prevent="newSource">
              <i class="far fa-plus fa-fw" /> 添加工单
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
      </Table>
    </CardTable>
    <CardFooter>
      <Button v-if="allow('manage', Issue)" variant="primary" v-confirm="'确认合并？'" @click.prevent="merge" :disabled="issues.length < 2">
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
          <controls.Number />
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
import { Button } from '$ui/button'
import { Former, GenericForm, GenericFormGroup, UnprocessableEntityError } from '$ui/simple_form'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTable, CardTitle, CardTopState } from '$ui/card'
import { Issue } from "@/models"
import _ from 'lodash'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as q from '@/requests'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import IssueStateBadge from '@/components/IssueStateBadge.vue'
import { AxiosError } from 'axios'
import { usePageStore } from '@/store'
import { useQueryLine } from '@/lib/useQueryLine'
import PathHelper from '@/lib/PathHelper'
import vConfirm from '@/components/vConfirm'
import OkUrl from '@/lib/ok_url'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const ok_url = new OkUrl(route)

const project_id = _.toInteger(params.project_id)
const add_dialog_open = ref(false)
const path_info = PathHelper.parseMember(route.path, 'merge')

const issues = ref([] as Issue[])

const { data: head } = line.request(q.bug.issues.Get(), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = params.issue_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

issues.value.push(head.value.issue)

function newSource() {
  add_dialog_open.value = true
}

function deleteSource(issue: Issue) {
  issues.value = issues.value.filter(i => i.id !== issue.id)
}

const former = Former.build({
  source_id: undefined,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

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
    const { data: issueBox, suspense } = line.request(q.bug.issues.Get(), (req, it) => {
      req.interpolations.project_id = project_id
      req.interpolations.issue_id = former.form.source_id!
      return it.useQuery(req.toQueryConfig())
    })
    await suspense()

    if (issueBox.value.issue.state == 'closed') {
      former.validator.get('source_id').invalid(['已关闭的工单不能添加'])
      return
    }

    issues.value.push(issueBox.value.issue)

    add_dialog_open.value = false
  } catch(e) {
    if (e instanceof AxiosError && e.response?.status === 404) {
      former.validator.get('source_id').invalid(['工单不存在'])
      return
    }

    throw e
  }
}

const { mutateAsync: merge_issue_action } = line.request(q.bug.issues.Merge(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function merge() {
  try {
    const issue_box = await merge_issue_action({
      interpolations: {
        project_id: project_id,
        issue_id: head.value.issue.id
      },
      body: {
        source_ids: issues.value.filter(issue => issue.id !== head.value.issue.id).map(issue => issue.id)
      }
    })

    router.push(path_info.resource)
  } catch(e) {
    if (e instanceof UnprocessableEntityError) {
      alert(e.errors.errorMessages.join("\n"))
      return
    }

    throw e
  }
}
</script>

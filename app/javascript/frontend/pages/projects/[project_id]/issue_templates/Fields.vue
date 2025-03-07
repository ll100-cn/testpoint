<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="name" label="模版名称">
      <controls.string />
    </FormGroup>
    <FormGroup path="lookup_by_build_form" label="新增问题时可选">
      <controls.checkboxes v-bind="{ collection: lookup_by_build_form_collection, labelMethod: 'label', valueMethod: 'value' }" />
      <div class="text-muted text-sm">不勾选则新增工单时隐藏, 只能人工指给定已创建的工单</div>
    </FormGroup>
    <FormGroup path="title_suggestion" label="预设标题">
      <controls.string />
    </FormGroup>
    <FormGroup path="default_category_id" label="预设分类">
      <controls.select include_blank>
        <OptionsForCategory :collection="categories" />
      </controls.select>
    </FormGroup>
    <FormGroup path="default_priority" label="预设优先级">
      <controls.select include_blank>
        <OptionsForSelect :collection="ISSUE_PRIORITY_OPTIONS" />
      </controls.select>
    </FormGroup>
    <FormGroup path="content_suggestion" label="预设内容">
      <controls.markdown />
    </FormGroup>
    <FormGroup path="inputs" label="内容">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">名称</TableHead>
              <TableHead scope="col">排序</TableHead>
              <TableHead scope="col">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(input, index) in former.form.inputs_attributes" :key="input.id">
              <TableCell><controls.string v-model="input['label']" /></TableCell>
              <TableCell><controls.number v-model="input['order_index']" /></TableCell>
              <TableCell>
                <a class="btn btn-danger" @click="onRemoveInput(index)">删除</a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button size="sm" preset="outline" class="m-2" type="button" @click="onAddInput">+ 新增</Button>
      </Card>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import useRequestList from '@bbb/useRequestList'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { ISSUE_PRIORITY_OPTIONS } from "@/constants"
import * as q from '@/lib/requests'
import { usePageStore, useSessionStore } from '@/store'
import OptionsForCategory from '@/components/OptionsForCategory.vue'
import OptionsForSelect from '@/components/OptionsForSelect.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '@/ui'
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import * as controls from '@/components/controls'
import Button from '@/ui/button/Button.vue'
import { useRoute } from 'vue-router'

const reqs = useRequestList()
const session = useSessionStore()
const route = useRoute()
const params = route.params as any

const props = defineProps<{
  former: Former<any>
  project_id: string
}>()

const lookup_by_build_form_collection = ref([
  { label: "", value: true },
])

const { FormGroup } = FormFactory<typeof props.former.form>()

const categories = await reqs.raw(session.request(q.project.categories.List, params.project_id)).setup().perform()

async function onRemoveInput(index: number) {
  props.former.form.inputs_attributes.splice(index, 1)
}

async function onAddInput() {
  props.former.form.inputs_attributes.push({
    label: "",
    order_index: "",
  })
}
</script>

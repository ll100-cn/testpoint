<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="name" label="模版名称">
      <controls.String />
    </FormGroup>
    <FormGroup path="lookup_by_build_form" label="新增问题时可选">
      <controls.Boolean />
      <span class="text-muted text-sm">不勾选则新增工单时隐藏, 只能人工指给定已创建的工单</span>
    </FormGroup>
    <FormGroup path="title_suggestion" label="预设标题">
      <controls.String placeholder="请输入" />
    </FormGroup>
    <FormGroup path="default_category_id" label="预设分类">
      <controls.Select include-blank="请选择">
        <OptionsForCategory :collection="categories" />
      </controls.Select>
    </FormGroup>
    <FormGroup path="default_priority" label="预设优先级">
      <controls.Select include-blank>
        <OptionsForSelect :collection="ISSUE_PRIORITY_OPTIONS" />
      </controls.Select>
    </FormGroup>
    <FormGroup path="content_suggestion" label="预设内容">
      <controls.Markdown />
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
              <TableCell><controls.String v-model="input['label']" /></TableCell>
              <TableCell><controls.Number v-model="input['order_index']" /></TableCell>
              <TableCell>
                <Button variant="destructive" @click.prevent="removeInput(index)">删除</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button size="sm" preset="outline" class="m-2" type="button" @click.prevent="addInput">+ 新增</Button>
      </Card>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, computed } from 'vue'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { ISSUE_PRIORITY_OPTIONS } from "@/constants"
import * as q from '@/requests'
import { usePageStore, useSessionStore } from '@/store'
import OptionsForCategory from '@/components/OptionsForCategory.vue'
import OptionsForSelect from '@/components/OptionsForSelect.vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'
import Button from '$ui/button/Button.vue'
import { useRoute } from 'vue-router'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
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

const FormGroup = GenericFormGroup<typeof props.former.form>

const { data: category_boxes } = line.request(q.project.categories.List(), (req, it) => {
  req.interpolations.project_id = params.project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
const categories = computed(() => category_boxes.value.map(it => it.category))

async function removeInput(index: number) {
  props.former.form.inputs_attributes.splice(index, 1)
}

async function addInput() {
  props.former.form.inputs_attributes.push({
    label: "",
    order_index: "",
  })
}
</script>

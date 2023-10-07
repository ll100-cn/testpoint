<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <layouts.group code="name" label="模版名称">
      <controls.string />
    </layouts.group>
    <layouts.group code="lookup_by_build_form" label="新增问题时可选" hint="不勾选则新增工单时隐藏, 只能人工指给定已创建的工单">
      <controls.checkboxes v-bind="{ collection: lookup_by_build_form_collection, labelMethod: 'label', valueMethod: 'value' }" />
    </layouts.group>
    <layouts.group code="title_suggestion" label="预设标题">
      <controls.string />
    </layouts.group>
    <layouts.group code="default_category_id" label="预设分类">
      <controls.select include_blank>
        <OptionsForCategory :collection="categories" />
      </controls.select>
    </layouts.group>
    <layouts.group code="default_priority" label="预设优先级">
      <controls.select include_blank>
        <OptionsForSelect :collection="ISSUE_PRIORITY_OPTIONS" />
      </controls.select>
    </layouts.group>
    <layouts.group code="content_suggestion" label="预设内容">
      <controls.markdown />
    </layouts.group>
    <layouts.group code="inputs" label="内容">
      <div class="card overflow-auto">
        <table class="table mb-0">
          <thead>
            <tr>
              <th scope="col">名称</th>
              <th scope="col">排序</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(input, index) in former.form.inputs_attributes" :key="input.id">
              <td><controls.string v-model="input['label']" /></td>
              <td><controls.number v-model="input['order_index']" /></td>
              <td>
                <a class="btn btn-danger" @click="onRemoveInput(index)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-outline-primary btn-sm m-2" type="button" @click="onAddInput">+ 新增</button>
      </div>
    </layouts.group>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { controls, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import { ISSUE_PRIORITY_OPTIONS } from "@/constants"
import * as q from '@/lib/requests'
import { usePageStore } from '@/store'
import OptionsForCategory from '@/components/OptionsForCategory.vue'
import OptionsForSelect from '@/components/OptionsForSelect.vue'

const { proxy } = getCurrentInstance()
const page = usePageStore()

const props = defineProps<{
  former: Former<Record<string, any>>
  project_id: string
}>()

const lookup_by_build_form_collection = ref([
  { label: "", value: true },
])

const categories = await page.inProject().request(q.project.CategoryReq.List).setup(proxy).perform()

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

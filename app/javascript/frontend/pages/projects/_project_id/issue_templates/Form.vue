<template>
  <FormExtraErrorAlert :validations="validations" />

  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('name')" label="模版名称">
    <forms.string v-bind="{ ...slotProps, form}" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('lookup_by_build_form')" label="新建问题时可选" hint="不勾选则新建工单时隐藏, 只能人工指给定已创建的工单">
    <forms.checkboxes v-bind="{ ...slotProps, form, collection: lookup_by_build_form_collection, labelMethod: 'label', valueMethod: 'value' }" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('title_suggestion')" label="预设标题">
    <forms.string v-bind="{ ...slotProps, form }" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('default_category_id')" label="预设分类">
    <forms.select v-bind="{ ...slotProps, form, collection: categories, labelMethod: 'name', valueMethod: 'id', includeBlank: true }" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('default_priority')" label="预设优先级">
    <forms.select v-bind="{ ...slotProps, form, collection: priority_collection, labelMethod: 'label', valueMethod: 'value', includeBlank: true }" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('content_suggestion')" label="预设内容">
    <forms.markdown v-bind="{ ...slotProps, form }" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('inputs')" label="内容">
    <div class="card">
      <table class="table mb-0">
        <thead>
          <tr>
            <th scope="col">名称</th>
            <th scope="col">排序</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(input, index) in form.inputs_attributes" :key="input.id">
            <td><forms.string v-bind="{ ...slotProps, form: input, code: 'label' }" /></td>
            <td><forms.number v-bind="{ ...slotProps, form: input, code: 'order_index' }" /></td>
            <td><button class="btn btn-link" @click="onRemoveInput(index)">删除</button></td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary btn-sm m-2" @click="onAddInput">+ 新建</button>
    </div>
  </layouts.vertical_group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Validations, forms, layouts } from "@/components/simple_form"
import { Category } from '@/models'

import FormExtraErrorAlert from '@/components/FormExtraErrorAlert.vue'

const props = defineProps<{
  form: any
  project_id: string
  categories: Category[]
  validations: Validations
}>()

const validations = ref(new Validations())
const lookup_by_build_form_collection = ref([
  { label: "", value: true },
])
const priority_collection = ref([
  { label: "ow", value: "ow" },
  { label: "普通", value: "normal" },
  { label: "重要", value: "important" },
])

async function onRemoveInput(index: number) {
  props.form.inputs_attributes.splice(index, 1)
}

async function onAddInput() {
  props.form.inputs_attributes.push({
    label: "",
    order_index: "",
  })
}
</script>

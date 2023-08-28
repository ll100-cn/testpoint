<template>
  <div class="page-header">
    <h2>新增问题模版</h2>
  </div>

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
      <table class="table">
        <thead>
          <tr>
            <th scope="col">名称</th>
            <th scope="col">排序</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="input in inputs_attributes">
            <td><forms.string v-bind="{ ...slotProps, input }" /></td>
            <td><forms.string v-bind="{ ...slotProps, input }" /></td>
            <td><forms.string v-bind="{ ...slotProps, finputorm }" /></td>
          </tr> -->
        </tbody>
      </table>
      <!-- <button class="btn btn-primary btn-sm m-2" @click="addInput">+ 新建</button> -->
    </div>
  </layouts.vertical_group>

  <div class="x-actions">
    <SubmitButton submit_text="新增问题模版" :func="onSubmit" />
    <button class="btn btn-secondary" @click="utils.redirect(`/projects/${project_id}/issue_templates`)">取消</button>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { TaskUpshotInfo, TestCaseStat } from '@/models';
import * as requests from '@/requests';
import { plainToClass } from 'class-transformer';
import _ from 'lodash';
import { ChangeFilterFunction, ColumnFilter, Filter } from '../types';
import * as utils from '@/lib/utils'
import { Validations, forms, layouts } from "@/components/simple_form";

import FolderSide from '../FolderSide.vue';
import PlanPhaseCreateModal from './PlanPhaseCreateModal.vue';
import TaskModal from './TaskModal.vue';
import TaskRow from './TaskRow.vue';
import { hide } from '@popperjs/core';
import SubmitButton from '@/components/SubmitButton.vue';
import FormExtraErrorAlert from '@/components/FormExtraErrorAlert.vue'

const route = useRoute()
const { proxy } = getCurrentInstance()

const project_id = route.params.project_id
const validations = ref(new Validations())
const lookup_by_build_form_collection = ref([
  { label: "", value: true },
])

const categories = ref(await new requests.CategoryList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const form = ref({
  name: "",
  lookup_by_build_form: true,
  title_suggestion: "",
  default_priority: "normal",
  default_category_id: "",
  inputs_attributes: []
})

const priority_collection = ref([
  { label: "ow", value: "ow" },
  { label: "普通", value: "normal" },
  { label: "重要", value: "important" },
])

async function onSubmit() {
  console.log(form.value, 1111111111)
}
</script>

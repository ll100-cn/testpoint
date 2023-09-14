<template>
  <FormInline :validations="validations">
    <layouts.inline_group v-slot="slotProps" label="分类" :validation="validations.disconnect('category_id_eq')">
      <forms.bootstrap_select v-bind="{ ...slotProps, form: search, collection: category_collection, labelMethod: 'name', valueMethod: 'id', include_blank: '全部' }" @change="querySearch" />
    </layouts.inline_group>
    <layouts.inline_group v-slot="slotProps" label="里程碑" :validation="validations.disconnect('milestone_id_eq')">
      <forms.bootstrap_select v-bind="{ ...slotProps, form: search, collection: milestone_collection, labelMethod: 'title', valueMethod: 'id', include_blank: '任意' }" @change="querySearch" />
    </layouts.inline_group>
    <layouts.inline_group v-slot="slotProps" label="受理人" :validation="validations.disconnect('assignee_id_eq')">
      <forms.bootstrap_select v-bind="{ ...slotProps, form: search, collection: assignee_collection, labelMethod: 'name', valueMethod: 'id', include_blank: '任意' }" @change="querySearch" />
    </layouts.inline_group>
    <layouts.inline_group v-slot="slotProps" label="创建人" :validation="validations.disconnect('creator_id_eq')">
      <forms.bootstrap_select v-bind="{ ...slotProps, form: search, collection: creator_collection, labelMethod: 'name', valueMethod: 'id', include_blank: '任意' }" @change="querySearch" />
    </layouts.inline_group>
    <layouts.inline_group v-slot="slotProps" label="问题类型" :validation="validations.disconnect('task_id_is')">
      <forms.bootstrap_select v-bind="{ ...slotProps, form: search, collection: issue_type_collection, labelMethod: 'label', valueMethod: 'value', include_blank: '所有' }" @change="querySearch" />
    </layouts.inline_group>
  </FormInline>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"

import * as utils from "@/lib/utils"
import _ from "lodash"

import { Validations, forms, layouts } from "@/components/simple_form"
import { IssueSummary } from "@/models"
import Search from "./Search"
import FormInline from "@/components/FormInline.vue"

const route = useRoute()
const router = useRouter()
const query = utils.queryToPlain(route.query)

const props = defineProps<{
  summary: IssueSummary
}>()

const validations = reactive<Validations>(new Validations())
const search = reactive(utils.instance(Search, query))
const issue_type_collection = [{ label: "案例问题", value: "not_null" }, { label: "非案例问题", value: "null" }]

const category_collection = computed(() => {
  return _(props.summary.by_category).map(({ category, count }) => {
    if (category && count > 0) {
      return { name: `${category.name}(${count})`, id: category.id }
    }
    return false
  }).compact().value()
})

const milestone_collection = computed(() => {
  return _(props.summary.by_milestone).map(({ milestone, count }) => {
    if (milestone && count > 0) {
      return { title: `${milestone.title}(${count})`, id: milestone.id }
    }
    return false
  }).compact().value()
})

const assignee_collection = computed(() => {
  return _(props.summary.by_assignee).map(({ assignee, count }) => {
    if (assignee && count > 0) {
      return { name: `${assignee.name}(${count})`, id: assignee.id }
    }
    return false
  }).compact().value()
})

const creator_collection = computed(() => {
  return _(props.summary.by_creator).map(({ creator, count }) => {
    if (creator && count > 0) {
      return { name: `${creator.name}(${count})`, id: creator.id }
    }
    return false
  }).compact().value()
})

function querySearch() {
  if (search) {
    const data = utils.compactObject(search)
    router.push({ query: utils.plainToQuery(data) })
  } else {
    router.push({ query: null })
  }
}
</script>

<template>
  <layouts.form_inline v-bind="{ former }" @submit.prevent="former.submit">
    <layouts.group label="分类" code="category_id_eq">
      <controls.bootstrap_select v-bind="{ collection: category_collection, labelMethod: 'name', valueMethod: 'id', include_blank: '全部' }" @change="former.submit" />
    </layouts.group>
    <layouts.group label="里程碑" code="milestone_id_eq">
      <controls.bootstrap_select v-bind="{ collection: milestone_collection, labelMethod: 'title', valueMethod: 'id', include_blank: '任意' }" @change="former.submit" />
    </layouts.group>
    <layouts.group label="受理人" code="assignee_id_eq">
      <controls.bootstrap_select v-bind="{ collection: assignee_collection, labelMethod: 'name', valueMethod: 'id', include_blank: '任意' }" @change="former.submit" />
    </layouts.group>
    <layouts.group label="创建人" code="creator_id_eq">
      <controls.bootstrap_select v-bind="{ collection: creator_collection, labelMethod: 'name', valueMethod: 'id', include_blank: '任意' }" @change="former.submit" />
    </layouts.group>
    <layouts.group label="问题类型" code="task_id_is">
      <controls.bootstrap_select v-bind="{ collection: issue_type_collection, labelMethod: 'label', valueMethod: 'value', include_blank: '所有' }" @change="former.submit" />
    </layouts.group>
  </layouts.form_inline>
</template>

<script setup lang="ts">
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as utils from "@/lib/utils"
import { IssueSummary } from "@/models"
import _ from "lodash"
import { computed, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import Search from "./Search"

const route = useRoute()
const router = useRouter()
const query = utils.queryToPlain(route.query)

const props = defineProps<{
  summary: IssueSummary
}>()

const search = reactive(utils.instance(Search, query))

const former = Former.build(search)
former.perform = async function() {
  const data = utils.compactObject(this.form)
  router.push({ query: utils.plainToQuery(data) })
}

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
</script>

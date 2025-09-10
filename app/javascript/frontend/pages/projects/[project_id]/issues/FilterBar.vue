<template>
  <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform()">
    <FormGroup label="分类" path="category_id_eq">
      <controls.Selectpicker include-blank="全部">
        <template v-for="category_stat in summary.byCategory">
          <SelectdropItem v-if="category_stat.count > 0" :value="category_stat.category?.id ?? -1">
            {{ category_stat.category?.name ?? '未分配' }} ({{ category_stat.count }})
          </SelectdropItem>
        </template>
      </controls.Selectpicker>
    </FormGroup>

    <FormGroup label="里程碑" path="milestone_id_eq">
      <controls.Selectpicker include-blank="全部">
        <SelectdropItem v-for="milestone in milestone_collection" :value="milestone.id">
          {{ milestone.title }}
        </SelectdropItem>
      </controls.Selectpicker>
    </FormGroup>

    <FormGroup label="受理人" path="assignee_id_eq">
      <controls.Selectpicker include-blank="全部">
        <SelectdropItem v-for="assignee in assignee_collection" :value="assignee.id">
          {{ assignee.name }}
        </SelectdropItem>
      </controls.Selectpicker>
    </FormGroup>

    <FormGroup label="创建人" path="creator_id_eq">
      <controls.Selectpicker include_blank="任意">
        <SelectdropItem v-for="creator in creator_collection" :value="creator.id">
          {{ creator.name }}
        </SelectdropItem>
      </controls.Selectpicker>
    </FormGroup>

    <FormGroup label="问题类型" path="task_id_is">
      <controls.Selectpicker include_blank="所有">
        <SelectdropItem v-for="item in issue_type_collection" :value="item.value">
          {{ item.label }}
        </SelectdropItem>
      </controls.Selectpicker>
    </FormGroup>
  </Form>
</template>

<script setup lang="ts">
import * as utils from "@/lib/utils"
import { IssueSummary } from "@/models"
import _ from "lodash"
import { computed, reactive, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Search2, Filter2 } from "./types"
import BSOption from "@/components/BSOption.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'

const route = useRoute()
const router = useRouter()
const query = utils.queryToPlain(route.query)

const props = defineProps<{
  summary: IssueSummary
}>()

const search2 = reactive(utils.instance(Search2, query))
const filter2 = reactive(utils.instance(Filter2, query))

const former = Former.build(filter2)

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const data = utils.compactObject({ ...search2, ...this.form })
  router.push({ query: utils.plainToQuery(data) })
}

watch(former.form, () => { former.perform() })

const issue_type_collection = [{ label: "案例问题", value: "not_null" }, { label: "非案例问题", value: "null" }]

const category_collection = computed(() => {
  return _(props.summary.byCategory).map(({ category, count }) => {
    if (category && count > 0) {
      return { name: `${category.name} (${count})`, id: category.id }
    }
    return false
  }).compact().value()
})

const milestone_collection = computed(() => {
  return _(props.summary.byMilestone).map(({ milestone, count }) => {
    if (milestone && count > 0) {
      return { title: `${milestone.title} (${count})`, id: milestone.id }
    }
    return false
  }).compact().value()
})

const assignee_collection = computed(() => {
  return _(props.summary.byAssignee).map(({ assignee, count }) => {
    if (assignee && count > 0) {
      return { name: `${assignee.name} (${count})`, id: assignee.id }
    }
    return false
  }).compact().value()
})

const creator_collection = computed(() => {
  return _(props.summary.byCreator).map(({ creator, count }) => {
    if (creator && count > 0) {
      return { name: `${creator.name} (${count})`, id: creator.id }
    }
    return false
  }).compact().value()
})
</script>

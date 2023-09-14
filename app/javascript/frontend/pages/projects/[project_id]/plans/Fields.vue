<template>
  <FormErrorAlert />

  <layouts.group v-slot="slotProps" code="title" label="标题">
    <forms.string v-bind="{ ...slotProps, form: former.form }" />
  </layouts.group>
  <layouts.group v-slot="slotProps" code="platform_id" label="平台">
    <forms.select v-bind="{ ...slotProps, form: former.form, collection: platforms, labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.group>

  <layouts.group v-if="test_case_stats && test_case_stats.length > 0" v-slot="slotProps" code="role_names" label="角色">
    <forms.checkboxes v-bind="{ ...slotProps, form: former.form, collection: test_case_stats_collection, labelMethod: 'label', valueMethod: 'value' }" />
  </layouts.group>
</template>

<script setup lang="ts">
import { forms, layouts } from "@/components/simple_form"
import { computed } from 'vue'
import { Platform, TestCaseStat } from "@/models"
import _ from "lodash"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import Former from '@/components/simple_form/Former'

const props = withDefaults(defineProps<{
  former: Former<Record<string, any>>
  platforms: Platform[]
  test_case_stats?: TestCaseStat[]
}>(), {
})

const test_case_stats_collection = computed(() => {
  const role_name_list = _(props.test_case_stats).filter([ "archived", false ]).groupBy("role_name").keys().value()
  return role_name_list?.map((stat) => {
    return { "label": stat, "value": stat }
  })
})
</script>

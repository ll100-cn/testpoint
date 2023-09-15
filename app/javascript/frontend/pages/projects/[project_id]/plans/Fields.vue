<template>
  <FormErrorAlert />

  <layouts.group code="title" label="标题"><controls.string /></layouts.group>
  <layouts.group code="platform_id" label="平台">
    <controls.select v-bind="{ collection: platforms, labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.group>

  <layouts.group v-if="test_case_stats && test_case_stats.length > 0" code="role_names" label="角色">
    <controls.checkboxes v-bind="{ collection: test_case_stats_collection, labelMethod: 'label', valueMethod: 'value' }" />
  </layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
import { Platform, TestCaseStat } from "@/models"
import _ from "lodash"
import { computed } from 'vue'

const props = withDefaults(defineProps<{
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

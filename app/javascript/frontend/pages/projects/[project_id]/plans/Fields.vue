<template>
  <FormErrorAlert :validations="validations" />

  <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('title')" label="标题">
    <forms.string v-bind="{ ...slotProps, form }" />
  </layouts.horizontal_group>
  <layouts.horizontal_group v-slot="slotProps" :validation="validations.disconnect('platform_id')" label="平台">
    <forms.select v-bind="{ ...slotProps, form, collection: platforms, labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.horizontal_group>

  <layouts.horizontal_group v-if="test_case_stats && test_case_stats.length > 0" v-slot="slotProps" :validation="validations.disconnect('role_names')" label="角色">
    <forms.checkboxes v-bind="{ ...slotProps, form, collection: test_case_stats_collection, labelMethod: 'label', valueMethod: 'value' }" />
  </layouts.horizontal_group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Validations, forms, layouts } from "@/components/simple_form"

import _ from "lodash"
import { Platform, TestCaseStat } from "@/models"

import FormErrorAlert from "@/components/FormErrorAlert.vue"

const props = withDefaults(defineProps<{
  form: object
  validations: Validations
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

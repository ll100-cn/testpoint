<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="title" label="标题"><controls.string /></FormGroup>
    <FormGroup path="platform_id" label="平台">
      <controls.select>
        <OptionsForSelect :collection="platforms.map(it => ({ label: it.name, value: it.id }))" />
      </controls.select>
    </FormGroup>

    <FormGroup v-if="test_case_stats && test_case_stats.length > 0" path="role_names" label="角色">
      <controls.checkboxes v-bind="{ collection: test_case_stats_collection, labelMethod: 'label', valueMethod: 'value' }" />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import OptionsForSelect from "@/components/OptionsForSelect.vue"
import { Platform, TestCaseStat } from "@/models"
import _ from "lodash"
import { computed } from 'vue'
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import * as controls from '@/components/controls'

const props = withDefaults(defineProps<{
  former: Former<any>
  platforms: Platform[]
  test_case_stats?: TestCaseStat[]
}>(), {
})

const { FormGroup } = FormFactory<typeof props.former.form>()

const test_case_stats_collection = computed(() => {
  const role_name_list = _(props.test_case_stats).filter([ "archived", false ]).groupBy("role_name").keys().value()
  return role_name_list?.map((stat) => {
    return { "label": stat, "value": stat }
  })
})
</script>

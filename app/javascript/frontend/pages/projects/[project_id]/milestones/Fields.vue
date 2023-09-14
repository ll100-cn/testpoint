<template>
  <FormErrorAlert />

  <component :is="layouts.group" v-slot="slotProps"  code="title" label="标题">
    <component :is="forms.string" v-bind="{ ...slotProps, form: former.form }" />
  </component>

  <component :is="layouts.group" v-slot="slotProps"  code="published_at" label="发布时间">
    <component :is="forms.string" v-bind="{ ...slotProps, form: former.form }" />
  </component>

  <component :is="layouts.group" v-slot="slotProps"  code="description" label="描述">
    <component :is="forms.text" v-bind="{ ...slotProps, form: former.form }" />
  </component>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { forms, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'

const props = defineProps<{
  former: Former<Record<string, any>>
}>()
</script>

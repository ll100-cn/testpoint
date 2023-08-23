<template>
  <FormExtraErrorAlert :validations="validations" />

  <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('title')" label="标题">
    <forms.string v-bind="{ ...slotProps, form }" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('platform_id')" label="平台">
    <forms.select v-bind="{ ...slotProps, form, collection: platforms, labelMethod: 'name', valueMethod: 'id' }" />
  </layouts.vertical_group>
</template>

<script setup lang="ts">
import { Validations, forms, layouts } from "@/components/simple_form";

import FormExtraErrorAlert from "@/components/FormExtraErrorAlert.vue";
import { PropType } from "vue";
import { Platform } from "@/models";

const props = defineProps({
  form: { type: Object, required: true },
  validations: { type: Object as PropType<Validations>, required: true },
  platforms: { type: Array as PropType<Platform[]>, required: true }
})
</script>

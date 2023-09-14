<template>
  <FormErrorAlert :validations="validations" />

  <layouts.horizontal_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('name')" label="名称">
    <forms.string v-bind="{ ...slotProps, form}" />
  </layouts.horizontal_group>
  <layouts.horizontal_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('description')" label="描述">
    <forms.text v-bind="{ ...slotProps, form}" />
  </layouts.horizontal_group>
  <layouts.horizontal_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('color')" label="颜色">
    <forms.color v-bind="{ ...slotProps, form}" />
  </layouts.horizontal_group>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Validations, forms, layouts } from "@/components/simple_form"

const props = defineProps<{
  form: any
  project_id: string
  validations: Validations
}>()
</script>

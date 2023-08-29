<template>
  <FormExtraErrorAlert :validations="validations" />

  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('name')" label="名称">
    <forms.string v-bind="{ ...slotProps, form}" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('description')" label="描述">
    <forms.text v-bind="{ ...slotProps, form}" />
  </layouts.vertical_group>
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('color')" label="颜色">
    <forms.color v-bind="{ ...slotProps, form}" />
  </layouts.vertical_group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Validations, forms, layouts } from "@/components/simple_form"

import FormExtraErrorAlert from '@/components/FormExtraErrorAlert.vue'

const props = defineProps<{
  form: any
  project_id: string
  validations: Validations
}>()

const validations = ref(new Validations())
</script>

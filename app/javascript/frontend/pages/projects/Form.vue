<template>
  <FormErrorAlert :validations="validations" />
  <layouts.vertical_group v-slot="slotProps" label_class="col-2" :validation="validations.disconnect('name')" label="名称">
    <forms.string v-bind="{ ...slotProps, form }" />
  </layouts.vertical_group>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { Validations, forms, layouts } from "@/components/simple_form"

import FormErrorAlert from '@/components/FormErrorAlert.vue'

const props = defineProps<{
  form: any
  validations: Validations
  mode?: "edit" | "new"
}>()
</script>

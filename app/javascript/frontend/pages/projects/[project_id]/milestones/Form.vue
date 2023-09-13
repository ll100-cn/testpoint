<template>
  <FormErrorAlert :validations="validations" />

  <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('title')" label="标题">
    <component :is="forms.string" v-bind="{ ...slotProps, form }" />
  </component>

  <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('published_at')" label="发布时间">
    <component :is="forms.string" v-bind="{ ...slotProps, form }" />
  </component>

  <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('description')" label="描述">
    <component :is="forms.text" v-bind="{ ...slotProps, form }" />
  </component>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue';
import { Validations, layouts, forms } from '@/components/simple_form';
import { PropType } from 'vue';

const props = defineProps({
  validations: {
    type: Object as PropType<Validations>,
    required: true,
  },
  form: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  }
})
</script>

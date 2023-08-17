<template>
  <div class="alert alert-danger" role="alert" v-if="validations.isAvaliableInvalid()">
    <div v-for="message in validations.avaliableFullMessages()">
      {{ message }}
    </div>
  </div>

  <component :is="layouts.horizontal_group" :validation="validations.disconnect('title')" label="标题" v-slot="slotProps">
    <component :is="forms.string" v-bind="{ ...slotProps, form }" />
  </component>

  <component :is="layouts.horizontal_group" :validation="validations.disconnect('published_at')" label="发布时间" v-slot="slotProps">
    <component :is="forms.string" v-bind="{ ...slotProps, form }" />
  </component>

  <component :is="layouts.horizontal_group" :validation="validations.disconnect('description')" label="描述" v-slot="slotProps">
    <component :is="forms.text" v-bind="{ ...slotProps, form }" />
  </component>
</template>

<script setup lang="ts">
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

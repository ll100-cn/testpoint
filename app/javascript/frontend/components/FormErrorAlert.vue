<template>
  <div v-if="validations.isAvaliableInvalid()" class="alert alert-danger" role="alert">
    <div v-for="message in validations.avaliableFullMessages()" :key="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, inject } from 'vue'
import { Validations } from './simple_form';
import Former from './simple_form/Former'

const props = defineProps<{
  validations?: Validations
}>()

const former = inject('former') as Former<Record<string, any>>
const validations = props.validations || former.validations
</script>

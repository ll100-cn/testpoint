<template>
  <div v-if="validations.isAvaliableInvalid()" class="alert alert-danger" role="alert">
    <div v-for="message in validations.avaliableFullMessages()" :key="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Validations } from './simple_form';

defineProps({
  validations: {
    type: Object as PropType<Validations>,
    required: true,
  },
})

</script>

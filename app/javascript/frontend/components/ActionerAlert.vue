<template>
  <div v-if="actioner.validations.hasError()" class="alert alert-danger" role="alert">
    <div v-for="message in actioner.validations.errorMessages([])" :key="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Actioner } from './Actioner'

defineProps<{
  actioner: Actioner
}>()
</script>

<template>
  <FormErrorAlert :validations="actioner.validations" />
</template>

<script setup lang="ts">
import { Actioner } from './Actioner'
import FormErrorAlert from './FormErrorAlert.vue'

defineProps<{
  actioner: Actioner<any[]>
}>()
</script>
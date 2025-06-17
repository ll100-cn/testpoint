<template>
  <Alert v-if="actioner.validations.hasError()" variant="destructive">
    <AlertDescription>
      <div v-for="message in actioner.validations.errorMessages([])" :key="message">
        {{ message }}
      </div>
    </AlertDescription>
  </Alert>
</template>

<script setup lang="ts">
import { Alert, AlertDescription } from '$ui/alert';
import { Actioner } from './Actioner'

defineProps<{
  actioner: Actioner
}>()
</script>

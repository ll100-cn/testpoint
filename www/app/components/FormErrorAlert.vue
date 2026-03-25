<template>
  <Alert v-if="validator.errorMessages([]).length > 0" variant="destructive">
    <AlertDescription>
      <ul>
        <li v-for="message in validator.errorMessages([])" :key="message">
          {{ message }}
        </li>
      </ul>
    </AlertDescription>
  </Alert>
</template>

<script setup lang="ts">
import { type PropType, inject, reactive } from 'vue'
import { Validator, useFormer } from '$ui/simple_form'
import { Alert, AlertDescription } from '$ui/alert';

const props = defineProps<{
  validator?: Validator
}>()

const former = useFormer()
const validator = reactive(props.validator || former!.validator)
</script>

<template>
  <div v-if="validator.errorMessages([]).length > 0" class="alert alert-danger" role="alert">
    <div v-for="message in validator.errorMessages([])" :key="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, inject, reactive } from 'vue'
import Validator from '$vendor/ui/simple_form/Validator';
import Former from './simple_form/Former'
import { useInjectFormer } from '$vendor/ui/simple_form/types';

const props = defineProps<{
  validator?: Validator
}>()

const former = useInjectFormer()
const validator = reactive(props.validator || former.validator)
</script>

<template>
  <form class="inline-form row g-3">
    <slot></slot>

    <template v-if="slots.actions">
      <hr>

      <div class="x-actions">
        <slot name="actions" />
      </div>
    </template>
  </form>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import { Validations, layouts } from './simple_form'

const slots = useSlots()

const props = defineProps<{
  validations: Validations
}>()

</script>
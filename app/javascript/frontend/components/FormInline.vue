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
import { provide, useSlots } from 'vue'
import { Validations } from './simple_form'
import inline_group from './simple_form/layouts/inline_group.vue'

const slots = useSlots()

const props = defineProps<{
  validations: Validations
}>()

provide("GroupComponent", inline_group)

</script>
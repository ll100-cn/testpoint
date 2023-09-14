<template>
  <form class="horizontal-form">
    <slot></slot>

    <template v-if="slots.actions">
      <hr>

      <layouts.horizontal_group>
        <div class="x-actions">
          <slot name="actions" />
        </div>
      </layouts.horizontal_group>
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
<template>
  <form class="vertical-form">
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
import vertical_group from './simple_form/layouts/vertical_group.vue'
import Former from './simple_form/Former'

const slots = useSlots()

const props = defineProps<{
  validations?: Validations
  former: Former<Record<string, any>>
}>()

provide("GroupComponent", vertical_group)
provide("former", props.former)
</script>
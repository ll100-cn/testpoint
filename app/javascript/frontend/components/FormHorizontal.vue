<template>
  <form class="horizontal-form">
    <slot></slot>

    <template v-if="slots.actions">
      <hr>

      <layouts.group :validation="new Validation()">
        <div class="x-actions">
          <slot name="actions" />
        </div>
      </layouts.group>
    </template>
  </form>
</template>

<script setup lang="ts">
import { provide, useSlots } from 'vue'
import { Validations, layouts } from './simple_form'
import horizontal_group from './simple_form/layouts/horizontal_group.vue'
import Former from './simple_form/Former'
import { Validation } from '@/models'

const slots = useSlots()

const props = defineProps<{
  validations?: Validations
  former: Former<Record<string, any>>
}>()

provide("GroupComponent", horizontal_group)
provide("former", props.former)
</script>
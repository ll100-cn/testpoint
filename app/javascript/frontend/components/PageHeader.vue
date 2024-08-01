<template>
  <div class="flex items-baseline border-b !pb-2 !mb-4 !mt-6">
    <slot />

    <template v-if="slots.actions">
      <div class="ms-auto flex !gap-2">
        <slot name="actions" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>
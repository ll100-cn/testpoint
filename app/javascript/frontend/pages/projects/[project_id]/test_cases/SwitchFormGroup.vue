<template>
  <layouts.group :code="code" :label="label" :disabled="!enableds[code]">
    <template #label-prepend>
      <div class="col-auto pe-0 me-auto">
        <div class="form-check form-switch">
          <input v-model="enableds[code]" class="form-check-input" type="checkbox" role="switch">
        </div>
      </div>
    </template>
    <template #default><slot></slot></template>
  </layouts.group>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'

const props = defineProps<{
  label: string
  code: string
  enableds: Record<string, boolean>
}>()

</script>
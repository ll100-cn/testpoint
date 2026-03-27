<template>
  <template v-if="(collection instanceof Array)">
    <option v-for="item in collection" :value="item.value">
      {{ item.label }}
    </option>
  </template>
  <template v-else>
    <optgroup v-for="(list, key) in collection" :label="key">
      <option v-for="item in list" :value="item.value">
        {{ item.label }}
      </option>
    </optgroup>
  </template>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string | number
}

const props = defineProps<{
  collection: Option[] | Record<string, Option[]>
}>()
</script>
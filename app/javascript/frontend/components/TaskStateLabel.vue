<template>
  <span v-if="state == 'pending'" class="text-muted">
    待测试 <i class="far fa-circle" />
  </span>
  <span v-else-if="state == 'pass'" class="text-success">
    通过 <i class="far fa-check" />
  </span>
  <span v-else-if="state == 'failure'" class="text-danger">
    不通过 <i class="far fa-times" />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  state: string
}>()
</script>

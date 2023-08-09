<template>
  <span v-if="state == 'pending'" class="text-muted">
    待测试 <i class="far fa-circle"></i>
  </span>
  <span v-if="state == 'pass'" class="text-success">
    通过 <i class="far fa-check"></i>
  </span>
  <span v-if="state == 'failure'" class="text-danger">
    不通过 <i class="far fa-times"></i>
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  state: {
    type: String,
    required: true
  }
})

</script>
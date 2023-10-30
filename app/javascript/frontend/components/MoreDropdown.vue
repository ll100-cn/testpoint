<template>
  <div class="dropdown dropdown-no-arrow" v-show="shown">
    <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown">
      <i class="far fa-ellipsis-h"></i>
    </button>
    <div ref="content_node" class="dropdown-menu dropdown-menu-end">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { onMounted, ref } from 'vue'

const content_node = ref(null! as HTMLDivElement)
const shown = ref(false)

onMounted(() => {
  shown.value = !_.isEmpty(content_node.value.innerHTML)
})
</script>

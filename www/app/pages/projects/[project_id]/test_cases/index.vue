<template>
  <div class="flex gap-x-3">
    <div class="flex-1">
      <CaseCard />
    </div>
    <div class="w-full md:w-1/3 xl:w-1/4">
      <Timeline />
    </div>
  </div>
</template>

<script setup lang="ts">
import CaseCard from './CaseCard.vue';
import Timeline from './Timeline.vue';

const setupd = await (async () => true)()
</script>

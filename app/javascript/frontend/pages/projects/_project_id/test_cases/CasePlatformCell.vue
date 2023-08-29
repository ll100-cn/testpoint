<template>
  <span v-for="platform in platforms" :key="platform.id" class="badge me-2" :style="{ backgroundColor: utils.calcColorHex(platform.name), color: 'white' }">
    {{ platform.name }}
  </span>
</template>

<script setup lang="ts">
import { EntityRepo, Platform } from '@/models';
import _ from 'lodash';
import { PropType, computed } from 'vue';
import * as utils from '@/lib/utils'

const props = defineProps({
  platform_repo: {
    type: Object as PropType<EntityRepo<Platform>>,
    required: true
  },
  platform_ids: {
    type: Array<number>,
    required: true
  }
})

const platforms = computed(() => {
  const ids = _.intersection(props.platform_repo.keys(), props.platform_ids)
  return props.platform_repo.valuesAt(ids)
})

</script>

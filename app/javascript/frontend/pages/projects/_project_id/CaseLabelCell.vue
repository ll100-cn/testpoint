<template>
  <span v-for="label in labels" class="badge text-bg-secondary me-2">
    {{ label.name }}
  </span>
</template>

<script setup lang="ts">
import { EntityRepo, TestCaseLabel } from '@/models';
import _ from 'lodash';
import { PropType, computed } from 'vue';

const props = defineProps({
  label_repo: {
    type: Object as PropType<EntityRepo<TestCaseLabel>>,
    required: true
  },
  label_ids: {
    type: Array<number>,
    required: true
  }
})

const labels = computed(() => {
  const ids = _.intersection(props.label_repo.keys(), props.label_ids)
  return props.label_repo.valuesAt(ids)
})

</script>

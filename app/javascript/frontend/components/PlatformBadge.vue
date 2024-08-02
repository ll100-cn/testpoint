<template>
  <Badge preset="standard" :style="{ backgroundColor: utils.calcColorHex(platform.name), color: 'white' }">
    {{ platform.name }}
  </Badge>
</template>

<script setup lang="ts">
import { EntityRepo, Platform } from '@/models';
import _ from 'lodash';
import { type PropType, computed } from 'vue';
import * as utils from '@/lib/utils'
import { Badge } from '$vendor/ui';

const props = defineProps<{
  platform: Platform
}>()

</script>

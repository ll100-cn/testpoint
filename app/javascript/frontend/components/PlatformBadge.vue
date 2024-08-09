<template>
  <Badge preset="standard" :style="{ backgroundColor: utils.calcColorHex(platform.name), color: 'white' }" class="align-middle">
    <svg viewBox="0 0 32 32" fill="none" class="stroke-[3px] stroke-white size-3.5 me-1" v-if="platform.icon_svg" v-html="platform.icon_svg" />
    <div class="">
      {{ platform.name }}
    </div>
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

<template>
  <Badge preset="standard" :style="{ backgroundColor: utils.calcColorHex(platform.name), color: 'white' }" class="align-middle gap-1">
    <svg viewBox="0 0 32 32" fill="none" class="stroke-white size-3.5" v-if="platform.icon_svg" v-html="platform.icon_svg" />
    <div v-if="only != 'icon'">
      {{ platform.name }}
    </div>
  </Badge>
</template>

<script setup lang="ts">
import { EntityRepo, Platform } from '@/models';
import _ from 'lodash';
import { type PropType, computed } from 'vue';
import * as utils from '@/lib/utils'
import { Badge } from '@/ui';

const props = defineProps<{
  platform: Platform
  only?: 'icon'
}>()

</script>

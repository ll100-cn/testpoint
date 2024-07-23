<template>
  <div class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" :class="{ active: is_actived }" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <slot name="toggle" />
    </a>
    <div ref="dropdown_menu" class="dropdown-menu">
      <slot name="menu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { computed, ref } from 'vue'

const dropdown_menu = ref(null as HTMLDivElement)
const is_actived = computed(() => !_.isEmpty(dropdown_menu.value?.querySelectorAll('.active')))
</script>
<template>
  <div class="inline-flex items-center self-center">
    <div class="me-1 relative" style="width: 1.25em;">
      <img class="rounded-circle" :src="member.avatar_url" style="position: absolute; top: 50%; transform: translateY(-50%); width: 100%;">
    </div>
    <span>{{ member.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { Member } from '@/models'

defineProps<{
  member: Member
}>()
</script>

<template>
  <div class="d-inline-flex align-items-center align-self-center">
    <div class="me-1 position-relative" style="width: 1.25em;">
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

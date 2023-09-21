<template>
  <div class="page-header">
    <h2 class="me-3">个人中心</h2>
  </div>

  <div class="nav nav-tabs page-card-tabs">
    <router-link class="nav-link" :class="{ 'active': current == 'basic' }" to="/profile/basic">
      基本信息
    </router-link>
    <router-link v-for="member_info in member_infos" class="nav-link" :class="{ active: current == member_info.id }" :to="`/profile/members/${member_info.id}`">
      {{ member_info.project.name }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import * as requests from '@/lib/requests'
import { usePageStore } from "@/store"
import { getCurrentInstance, ref } from "vue"

const page = usePageStore()
const proxy = getCurrentInstance()!.proxy!

defineProps<{
  current: string | number
}>()

const member_infos = ref(await page.singleton(requests.profile.MemberInfoReq.List).setup(proxy).perform())
</script>
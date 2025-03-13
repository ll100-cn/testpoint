<template>
  <PageHeader>
    <PageTitle>个人中心</PageTitle>
  </PageHeader>

  <!-- <div class="nav nav-tabs page-card-tabs">
    <router-link class="nav-link" :class="{ 'active': current == 'basic' }" to="/profile/basic">
      基本信息
    </router-link>
    <router-link v-for="member_info in member_infos" class="nav-link" :class="{ active: current == member_info.project_id }" :to="`/profile/projects/${member_info.project_id}`">
      {{ member_info.project.name }}
    </router-link>
  </div> -->

  <Nav preset="tabs">
    <NavItem value="basic" as-child>
      <RLink to="/profile/basic">基本信息</RLink>
    </NavItem>
    <NavItem v-for="member_info in member_infos" :value="member_info.project_id" as-child>
      <RLink :to="`/profile/projects/${member_info.project_id}`">{{ member_info.project.name }}</RLink>
    </NavItem>
  </Nav>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { usePageStore, useSessionStore } from "@/store"
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Nav, NavItem } from '$ui/nav'
import RLink from '@/components/RLink.vue'

const reqs = useRequestList()
const session = useSessionStore()

defineProps<{
  current?: string | number
}>()

const member_infos = reqs.raw(session.request(q.profile.members.InfoList)).setup().wait()
await reqs.performAll()
</script>

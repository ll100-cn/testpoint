<template>
  <PageHeader>
    <PageTitle>个人中心</PageTitle>
  </PageHeader>

  <Nav preset="tabs">
    <NavItem value="basic" as-child>
      <RLink to="/profile/basic">基本信息</RLink>
    </NavItem>
    <NavItem v-for="member_box in member_page.list" :value="member_box.member.project_id" as-child>
      <RLink :to="`/profile/projects/${member_box.member.project_id}`">{{ member_box.project!.name }}</RLink>
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

const member_page = reqs.raw(session.request(q.profile.members.InfoList)).setup().wait()
await reqs.performAll()
</script>

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
import { usePageStore, useSessionStore } from "@/store"
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Nav, NavItem } from '$ui/nav'
import RLink from '@/components/RLink.vue'
import { useQueryLine } from '@/lib/useQueryLine'

const session = useSessionStore()
const line = useQueryLine()

defineProps<{
  current?: string | number
}>()

const { data: member_page } = line.request(q.profile.members.InfoList(), (req, it) => {
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
</script>

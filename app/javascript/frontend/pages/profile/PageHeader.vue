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

  <Nav :model-value="current">
    <NavList preset="tabs">
      <NavItem value="basic" as-child>
        <router-link to="/profile/basic">基本信息</router-link>
      </NavItem>
      <NavItem v-for="member_info in member_infos" :value="member_info.project_id" as-child>
        <router-link :to="`/profile/projects/${member_info.project_id}`">{{ member_info.project.name }}</router-link>
      </NavItem>
    </NavList>
  </Nav>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { usePageStore } from "@/store"
import { getCurrentInstance, ref } from "vue"
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Nav, NavList, NavItem } from '@/ui'

const page = usePageStore()
const proxy = getCurrentInstance()!.proxy!

defineProps<{
  current: string | number
}>()

const member_infos = ref(await page.singleton(q.profile.members.InfoList).setup(proxy).perform())
</script>

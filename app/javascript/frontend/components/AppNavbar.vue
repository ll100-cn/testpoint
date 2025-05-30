<template>
  <div class="bg-gray-800 py-2 sticky top-0 mb-6 z-10">
    <Container preset="fluid">
      <div class="flex">
        <Nav :preset="navbarPt">
          <NavItem class="ps-0" as-child>
            <RLink to="/">Testpoint</RLink>
          </NavItem>

          <template v-if="account">
            <NavItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span>{{ profile?.project_name ?? "选择项目" }}</span>
                  <i class="fa-solid fa-caret-down ms-1"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem v-for="project in projects" :key="project.id" class="justify-between" as-child>
                    <RLink :to="`/projects/${project.id}`">
                      <span>{{ project.name }}</span>
                      <i class="fal fa-sign-in-alt fa-fw"></i>
                    </RLink>
                  </DropdownMenuItem>

                  <template v-if="account?.admin">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="justify-between" as-child>
                      <RLink to="/projects">
                        <span>项目设置</span>
                        <i class="fal fa-cogs fa-fw"></i>
                      </RLink>
                    </DropdownMenuItem>
                  </template>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavItem>

            <ProjectNav v-if="profile" :project_id="profile.project_id" />
          </template>
        </Nav>

        <Nav :preset="navbarPt" v-if="account" class="ms-auto">
          <NavItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span v-if="profile">
                  <img class="rounded-circle h-6 inline-block" :src="account.avatarUrl()">
                  {{ profile?.nickname ?? account.name }} ({{ profile.role_text }})
                </span>

                <span v-else>
                  <img class="rounded-circle h-6 inline-block" :src="account.avatarUrl()">
                  {{ account.name }}
                </span>

                <i class="fa-solid fa-caret-down ms-1"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent :align="'end'">
                <DropdownMenuItem as-child>
                  <RLink to="/profile/basic">个人中心</RLink>
                </DropdownMenuItem>
                <DropdownMenuItem @click.prevent="signOut">退出</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavItem>
        </Nav>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { MemberBox, MemberInfo, MemberPage } from '@/models'
import { usePageStore } from '@/store'
import { useSessionStore } from '@/store/session'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProjectNav from './ProjectNav.vue'
import { Nav, NavItem } from '$ui/nav'
import { bva } from '$ui/utils'
import { type NavPresenter } from '$ui/nav/types'
import RLink from './RLink.vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'
import { Container } from '$ui/container'

const reqs = useRequestList()
const router = useRouter()
const session = useSessionStore()
const page = usePageStore()

const account = computed(() => session.account)
const profile = computed(() => page.inProject()?.profile)
const member_page = ref(null! as MemberPage<MemberBox>)

const projects = computed(() => member_page.value.list.map(it => it.project!))

if (account.value) {
  member_page.value = await reqs.raw(session.request(q.profile.members.InfoList)).setup().perform()
}

async function signOut() {
  await reqs.add(q.profile.login.Destroy).setup().perform()
  session.clear()
  router.push('/')
}

const navbarPt = {
  list: bva('flex', { }),
  item: bva(`
    p-2 text-white/55
    hover:text-white/75
    data-[state=active]:text-white
  `, {
    size: {
      xs: '',
      sm: '',
      default: '',
    }
  })
} satisfies NavPresenter

</script>

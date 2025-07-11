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
import { Container } from '$ui/container'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'
import { Nav, NavItem } from '$ui/nav'
import { type NavPresenter } from '$ui/nav/types'
import { bva } from '$ui/utils'
import { useQueryLine } from '@/lib/useQueryLine'
import * as q from '@/requests'
import { usePageStore } from '@/store'
import { useSessionStore } from '@/store/session'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ProjectNav from './ProjectNav.vue'
import RLink from './RLink.vue'

const router = useRouter()
const session = useSessionStore()
const page = usePageStore()
const line = useQueryLine()

const account = computed(() => session.account)
const profile = computed(() => page.inProject()?.profile)

const projects = computed(() => member_boxes.value.map(it => it.project))
const { data: member_boxes } = line.request(q.profile.members.List('+project'), (req, it) => {
  return it.useQuery({ ...req.toQueryConfig(), enabled: !!account.value })
})
await line.wait()

const { mutateAsync: destroy_login_action } = line.request(q.profile.login.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function signOut() {
  await destroy_login_action({})
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

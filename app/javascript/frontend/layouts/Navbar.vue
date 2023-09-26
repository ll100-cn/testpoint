<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top tp-navbar">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapseContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <div class="nav-item">
            <router-link class="nav-link" to="/">Testpoint</router-link>
          </div>

          <template v-if="account">
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" aria-expanded="false">
                {{ project?.name ?? "选择项目" }}
              </a>

              <div class="dropdown-menu">
                <router-link v-for="project in projects" class="small dropdown-item d-flex align-items-center" :to="`/projects/${project.id}`">
                  <span class="me-auto">{{ project.name }}</span>
                  <i class="fal fa-sign-in-alt"></i>
                </router-link>

                <template v-if="account?.admin">
                  <div class="dropdown-divider"></div>

                  <router-link class="small dropdown-item d-flex align-items-center" to="/projects">
                    <span class="me-auto">项目设置</span>
                    <i class="fal fa-cogs"></i>
                  </router-link>
                </template>
              </div>
            </div>

            <ProjectNav v-if="project" :project="project" />
          </template>
        </div>

        <div v-if="account" class="navbar-nav ms-md-auto">
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="dropdownMenuUser" role="button" href="#">
              <img height="25" class="rounded-circle" :src="account.avatarUrl()">
              {{ account.name }}
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <router-link class="dropdown-item" to="/profile/basic">个人中心</router-link>
              <a class="dropdown-item" rel="nofollow" href="#" @click="signOut">退出</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { MemberInfo } from '@/models'
import { usePageStore } from '@/store'
import { useSessionStore } from '@/store/session'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProjectNav from './ProjectNav.vue'

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const session = useSessionStore()
const page = usePageStore()

const account = computed(() => session.account)
const member_infos = ref([] as MemberInfo[])

const projects = computed(() => member_infos.value.map(it => it.project))

if (account.value) {
  member_infos.value = (await page.singleton(q.profile.MemberInfoReq.List).setup(proxy).perform())
}
const project = computed(() => {
  const project_id = page.inProject()?.project_id
  if (project_id == null) {
    return null
  }

  return projects.value.find((it) => it.id === project_id)
})

async function signOut() {
  await new q.profile.Logout().setup(proxy).perform()
  session.clear()
  router.push('/')
}

</script>
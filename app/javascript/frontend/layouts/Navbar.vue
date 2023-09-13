<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top tp-navbar">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapseContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapseContent">

        <div class="navbar-nav">


          <div class="nav-item">
            <a class="nav-link " href="/testpoint/dashboard">Testpoint</a>
          </div>

          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" aria-expanded="false">
              {{ project?.name ?? "选择项目" }}
            </a>

            <div class="dropdown-menu">
              <router-link v-for="project in projects.list" class="small dropdown-item d-flex align-items-center" :to="`/projects/${project.id}`">
                <span class="me-auto">{{ project.name }}</span>
                <i class="fal fa-sign-in-alt"></i>
              </router-link>

              <div class="dropdown-divider"></div>

              <router-link class="small dropdown-item d-flex align-items-center" to="/projects">
                <span class="me-auto">项目设置</span>
                <i class="fal fa-cogs"></i>
              </router-link>
            </div>
          </div>

          <ProjectNav v-if="project" :project="project" />
        </div>


        <div class="navbar-nav ms-md-auto">

          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="dropdownMenuUser" role="button" href="#">
              <img height="25" class="rounded-circle"
                src="https://www.gravatar.com/avatar/5afcacceca8e038dcdcbd94c1b93fb0f.png?s=200">
              {{ account?.user.name }}
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" href="/testpoint/profiles/basic?ok_url=%2Ftestpoint%2Fissues%2Fdashboard">个人中心</a>
              <a class="dropdown-item" rel="nofollow" href="#" @click="signOut">退出</a>
            </div>
          </div>

        </div>

      </div>
    </div>

  </nav>
</template>

<script setup lang="ts">
import * as requests from '@/requests'
import { useSessionStore } from '@/store/session'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectNav from './ProjectNav.vue'

const session = useSessionStore()
const account = session.account

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const router = useRouter()

const projects = ref(await new requests.ProjectPaginationList().setup(proxy).perform())
const project = computed(() => {
  const project_id = route.path.match(/\/projects\/(\d+)/)?.[1]
  console.log(project_id)
  if (project_id == null) {
    return null
  }

  return projects.value.list.find((it) => it.id.toString() === project_id)
})

async function signOut() {
  await new requests.AccountSignOut().setup(proxy).perform()
  session.clear()
  router.push('/')
}

</script>
<template>
  <div class="page-header">
    <h2>平台列表</h2>
    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link v-if="allow('create', Platform)" class="btn btn-primary" :to="`/projects/${project_id}/platforms/new`">新增平台</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="card page-card card-x-table">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>名称</th>
            <th>建议工单受理人</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <template v-for="platform in platforms" :key="platform.id">
            <tr>
              <td>{{ platform.name }}</td>
              <td>{{ _.find(members, { id: platform.default_assignee_id })?.name ?? "无" }}</td>
              <td>
                <div class="x-actions justify-content-end x-spacer-3">
                  <router-link v-if="allow('update', platform)" :to="`/projects/${project_id}/platforms/${platform.id}/edit`">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a v-if="allow('destroy', platform)" href="#" @click.prevent="onRemove(platform.id)"><i class="far fa-trash-alt" /> 删除</a>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations } from "@/components/simple_form"
import * as q from '@/lib/requests'
import _ from 'lodash'

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { usePageStore } from '@/store'
import { Platform } from '@/models'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const validations = reactive<Validations>(new Validations())
const project_id = params.project_id

const platforms = ref(await new q.project.PlatformReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const members = ref(await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform())

async function onRemove(id: number) {
  if (!confirm("是否删除平台？")) {
    return
  }

  try {
    await new q.project.PlatformReq.Destroy().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.platform_id = id
    }).perform()

    router.go(0)
  } catch (error) {
    if (validations.handleError(error)) {
      return
    }

    throw error
  }
}

</script>

<template>
  <div class="page-header">
    <h2>平台列表</h2>
    <div class="actions ms-auto">
      <router-link class="btn btn-primary" :to="`/projects/${project_id}/platforms/new`">新增平台</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="card card-x-table">
    <div class="card-body">
      <table class="table">
        <colgroup>
          <col>
          <col>
          <col>
        </colgroup>
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
              <td class="x-actions text-end">
                <router-link :to="`/projects/${project_id}/platforms/${platform.id}/edit`">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" @click.prevent="onRemove(platform.id)"><i class="far fa-trash-alt" /> 删除</a>
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
import * as requests from '@/requests'
import _ from 'lodash'

import FormErrorAlert from "@/components/FormErrorAlert.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const validations = reactive<Validations>(new Validations())
const project_id = params.project_id

const platforms = ref(await new requests.PlatformList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const members = ref(await new requests.MemberList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

async function onRemove(id: number) {
  if (!confirm("是否删除平台？")) {
    return
  }

  try {
    await new requests.PlatformDestroy().setup(proxy, (req) => {
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

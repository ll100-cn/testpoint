<template>
  <div class="page-header">
    <h2>项目成员列表</h2>
    <div class="actions ms-auto">
      <router-link class="btn btn-primary" :to="`/projects/${project_id}/members/new`">新增成员</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="card card-x-table">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>默认接收邮箱</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <template v-for="member in members.list" :key="member.id">
            <tr>
              <td>{{ member.id }}</td>
              <td>{{ member.name }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.role_text }}</td>
              <td>{{ member.receive_mail ? "开启" : "关闭" }}</td>
              <td class="x-actions text-end">
                <router-link :to="`/projects/${project_id}/members/${member.id}/edit`">
                  <i class="far fa-pencil-alt" /> 修改
                </router-link>
                <a href="#" @click.prevent="onArchive(member.id)"><i class="far fa-archive" /> 归档</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <PaginationBar class="mb-0 mt-2" :pagination="members" :current-query="currentQuery" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import _ from 'lodash'
import * as requests from '@/lib/requests'
import { Validations } from "@/components/simple_form"
import { PageQuery } from '@/types'

import FormErrorAlert from "@/components/FormErrorAlert.vue"
import PaginationBar from "@/components/PaginationBar.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const validations = reactive<Validations>(new Validations())
const project_id = params.project_id

const currentQuery = ref<PageQuery>({
  page: _.toInteger(route.query.page) || 1,
})

const members = ref(await new requests.MemberReq.Page().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = currentQuery.value
}).perform())

async function onArchive(id: number) {
  if (!confirm("是否归档成员？")) {
    return
  }

  try {
    await new requests.MemberArchive().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.member_id = id
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

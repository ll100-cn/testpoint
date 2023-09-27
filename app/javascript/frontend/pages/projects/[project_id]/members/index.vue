<template>
  <div class="page-header">
    <h2>项目成员列表</h2>
    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link v-if="allow('create', Member)" class="btn btn-primary" :to="`/projects/${project_id}/members/new`">新增成员</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="card page-card card-x-table">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>归档</th>
            <th>角色</th>
            <th>默认接收邮箱</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="member in members" :key="member.id">
            <tr :class="{ 'block-discard': member.archived_at }">
              <td>{{ member.id }}</td>
              <td>{{ member.name }}</td>
              <td>{{ h.datetime(member.archived_at) }}</td>
              <td>{{ member.role_text }}</td>
              <td>{{ member.receive_mail ? "开启" : "关闭" }}</td>
              <td>
                <div class="x-actions justify-content-end x-spacer-3">
                  <router-link v-if="allow('update', member)" :to="`/projects/${project_id}/members/${member.id}/edit`">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>
                  <a href="#" v-if="allow('archive', member)" @click.prevent="onArchive(member.id)"><i class="far fa-archive" /> 归档</a>
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
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Validations } from "@/components/simple_form"
import * as q from '@/lib/requests'
import { Member } from '@/models'
import { usePageStore } from '@/store'
import { PageQuery } from '@/types'
import _ from 'lodash'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as h from '@/lib/humanize'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const validations = reactive<Validations>(new Validations())
const project_id = params.project_id

const currentQuery = ref<PageQuery>({
  page: _.toInteger(route.query.page) || 1,
})

const members = ref(await new q.project.MemberReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = currentQuery.value
}).perform())

async function onArchive(id: number) {
  if (!confirm("是否归档成员？")) {
    return
  }

  try {
    await new q.project.MemberReq.Archive().setup(proxy, (req) => {
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

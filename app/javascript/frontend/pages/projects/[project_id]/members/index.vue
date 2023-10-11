<template>
  <div class="page-header">
    <h2>项目成员列表</h2>
    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link v-if="allow('create', Member)" class="btn btn-primary" :to="`/projects/${project_id}/members/new`">新增成员</router-link>
    </div>
  </div>

  <FormErrorAlert :validations="validations" />

  <div class="nav nav-tabs mb-n1px position-relative zindex-999">
    <a href="#" class="nav-link active" data-bs-toggle="tab" data-bs-target="#normal_card">正常</a>
    <a href="#" class="nav-link" data-bs-toggle="tab" data-bs-target="#archived_card">归档</a>
  </div>

  <div class="tab-content">
    <div v-for="(group, key) in grouped_members" :id="`${key}_card`" class="card page-card card-x-table rounded-top-left-0 tab-pane fade" :class="{ show: key == 'normal', active: key == 'normal' }">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>邮箱</th>
              <th>角色</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="member in group" :key="member.id">
              <tr :class="{ 'block-discard': member.archived_at }">
                <td>{{ member.id }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.user.email }}</td>
                <td>{{ member.role_text }}</td>
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

const members = ref(await new q.project.MemberInfoReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = currentQuery.value
}).perform())

const grouped_members = ref(_.groupBy(members.value, (member) => {
  return member.archived_at ? "archived" : "normal"
}))
console.log(grouped_members.value)

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

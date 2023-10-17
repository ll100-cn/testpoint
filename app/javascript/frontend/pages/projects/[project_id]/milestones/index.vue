<template>
  <div class="page-header justify-content-between">
    <h2>里程碑列表</h2>

    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link v-if="allow('create', Milestone)" class="btn btn-primary" :to="`/projects/${project_id}/milestones/new`">新增里程碑</router-link>
    </div>
  </div>

  <div class="nav nav-tabs mb-n1px position-relative zindex-999">
    <a href="#" class="nav-link active" data-bs-toggle="tab" data-bs-target="#normal_card">正常</a>
    <a href="#" class="nav-link" data-bs-toggle="tab" data-bs-target="#archived_card">归档</a>
  </div>

  <div class="tab-content">
    <div v-for="(group, key) in grouped_milestones" :id="`${key}_card`" class="card page-card card-x-table rounded-top-left-0 tab-pane fade" :class="{ show: key == 'normal', active: key == 'normal' }">
      <div class="card-body py-0">
        <table class="table mb-0">
          <colgroup>
            <col>
            <col>
            <col width="30%">
          </colgroup>
          <thead>
            <tr>
              <th>标题</th>
              <th>发布时间</th>
              <th>描述</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="milestone in group" :key="milestone.id" :class="{ 'block-discard': milestone.isPublished() }">
              <td>{{ milestone.title }}</td>
              <td>{{ h.datetime(milestone.published_at) }}</td>
              <td>
                <textarea :value="milestone.description" data-controller="markdown" readonly class="d-none" />
              </td>
              <td>
                <div class="x-actions justify-content-end x-spacer-3">
                  <router-link v-if="allow('update', milestone)" :to="`/projects/${project_id}/milestones/${milestone.id}/edit`">
                    <i class="far fa-pencil-alt" /> 修改
                  </router-link>

                  <a v-if="milestone.archived_at === null && allow('archive', milestone)" href="#" @click.prevent="milestoneArchive(milestone)"><i class="far fa-archive"></i> 归档</a>
                  <a v-if="milestone.archived_at && allow('active', milestone)" href="#" @click.prevent="milestoneActive(milestone)"><i class="far fa-box-up"></i> 取消归档</a>
                  <a v-if="allow('destroy', milestone)" href="#" @click.prevent="milestoneDestroy(milestone)"><i class="far fa-trash-alt"></i> 删除</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { Milestone } from '@/models'
import { usePageStore } from '@/store'
import _ from 'lodash'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const project_id = _.toNumber(params.project_id)
const milestones = ref(await page.inProject().request(q.project.MilestoneReq.List).setup(proxy).perform())
const grouped_milestones = ref(_.groupBy(milestones.value, (m) => m.archived_at ? 'archived' : 'normal'))

function milestoneDestroy(milestone: Milestone) {
  if (!confirm('确定要删除吗？')) {
    return
  }

  new q.project.MilestoneReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

function milestoneArchive(milestone: Milestone) {
  if (!confirm('确定要归档吗？')) {
    return
  }

  new q.project.MilestoneReq.Archive().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

function milestoneActive(milestone: Milestone) {
  if (!confirm('确定要取消归档吗？')) {
    return
  }

  new q.project.MilestoneReq.Active().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

</script>

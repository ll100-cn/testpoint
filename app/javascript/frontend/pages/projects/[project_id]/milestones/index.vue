<template>
  <div class="page-header justify-content-between">
    <h2>里程碑列表</h2>

    <div class="actions ms-auto">
      <RouterLink class="btn btn-primary" :to="`/projects/${project_id}/milestones/new`">新增里程碑</RouterLink>
    </div>
  </div>

  <div class="card card-x-table">
    <div class="card-body py-0">
      <table class="table mb-0">
        <colgroup>
          <col width="20%">
          <col width="20%">
          <col width="20%">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>标题</th>
            <th>发布时间</th>
            <th>是否归档</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="milestone in milestones" :key="milestone.id" :class="{ 'block-discard': milestone.isPublished() }">
            <td>{{ milestone.title }}</td>
            <td>{{ utils.humanize(milestone.published_at, DATE_FORMAT) }}</td>
            <td><span v-if="milestone.isArchived()">已归档</span></td>
            <td class="text-end x-actions">
              <RouterLink :to="`/projects/${project_id}/milestones/${milestone.id}/edit`">
                <i class="far fa-pencil-alt" /> 修改
              </RouterLink>

              <a href="#" @click.prevent="milestoneArchive(milestone)"><i class="far fa-archive" /> 归档</a>

              <a href="#" @click.prevent="milestoneDestroy(milestone)"><i class="far fa-trash-alt" /> 删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DATE_FORMAT } from '@/constants';
import * as utils from '@/lib/utils';
import { Milestone } from '@/models';
import * as requests from '@/requests';
import _ from 'lodash';
import { getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = _.toNumber(params.project_id)
const milestones = await new requests.MilestoneList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform()

function milestoneDestroy(milestone: Milestone) {
  if (!confirm('确定要删除吗？')) {
    return
  }

  new requests.MilestoneDestroy().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

function milestoneArchive(milestone: Milestone) {
  if (!confirm('确定要归档吗？')) {
    return
  }

  new requests.MilestoneArchive().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform()

  router.go(0)
}

</script>
<template>
  <div class="px-3">
    <div class="mt-1">
      <h5 class="my-auto d-inline-block">里程碑</h5>
    </div>
    <hr class="my-4">
    <div>
      <ul class="timeline">
        <template v-for="milestone in milestones" :key="milestone.id">
          <li class="timeline-item mb-5" :class="{ 'active': milestone.id == milestone_id }">
            <div class="text-sm mb-2" :class="{ 'text-muted': milestone.id != milestone_id }">
              <router-link :to="{ query: { milestone_id: milestone.id }}" class="link">{{ h.datetime(milestone.published_at) ?? '尚未发布' }}</router-link>
            </div>
            {{ milestone.title }}
            <p class="text-muted">
              <textarea id="content" v-model="milestone.description" name="content" data-controller="markdown" readonly class="hidden" />
            </p>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as h from '@/lib/humanize'
import * as q from '@/requests'
import _ from 'lodash'
import { getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const params = route.params as any

const project_id = _.toNumber(params.project_id)
const milestone_id = route.query.milestone_id != null ? _.toNumber(route.query.milestone_id) : null
const milestones = await new q.project.MilestoneReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query.filter = "available"
}).perform()
</script>

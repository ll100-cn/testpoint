<template>
  <div class="row border-bottom mb-3">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="plan in plans.list">
      <div class="card">
        <div class="card-body">
          <div class="card-title d-flex align-items-center">
            <h4>{{ plan.title }}</h4>
            <span v-if="plan.milestone" class="badge bg-light text-dark ms-auto">{{ plan.milestone.title }}</span>
          </div>

          <div class="d-flex">
            <p><span>{{ _(plan.tasks_state_counts).values().sum() }} 个任务</span></p>
            <p class="ms-auto">
              <span class="badge" :style="{ backgroundColor: utils.calcColorHex(plan.platform.name) }">{{ plan.platform.name }}</span>
            </p>
          </div>

          <div class="progress" style="height: 0.5rem;">
            <template v-for="state in ['pass', 'failure']">
              <div :class="`progress-bar ${progress_bg_mapping[state]}`" :style="`width: ${100.0 * plan.tasks_state_counts[state] / _(plan.tasks_state_counts).values().sum()}%`"></div>
            </template>
          </div>
        </div>

        <div class="card-footer d-flex justify-content-between align-items-center bg-white">
          <small>{{ dayjs(plan.created_at).fromNow() }} {{ plan.creator_name }} 创建</small>
          <button class="btn btn-outline-primary btn-sm py-1 stretched-link ms-auto" @click="utils.redirect(`/projects/${project_id}/plans/${plan.id}`)">进入测试</button>
        </div>
      </div>
    </div>
  </div>

  <PaginationBar :pagination="plans" :current-query="currentQuery" />
</template>

<script setup lang="ts">
import _ from 'lodash'
import { getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'

import PaginationBar from '@/components/PaginationBar.vue'
import * as utils from '@/lib/utils'
import { PageQuery } from '@/types'
import * as requests from '@/requests'
import dayjs from '@/lib/dayjs'

const { proxy } = getCurrentInstance()
const route = useRoute()

const currentQuery = ref<PageQuery>({
  page: _.toInteger(route.query.page) || 1,
})

const project_id = _.toNumber(route.params.project_id)
const plans = ref(await new requests.PlanList().setup(proxy, req => {
  req.interpolations.project_id = project_id
  req.query = currentQuery.value
}).perform())

const progress_bg_mapping = ref({ pass: "bg-success", failure: "bg-danger" })

</script>

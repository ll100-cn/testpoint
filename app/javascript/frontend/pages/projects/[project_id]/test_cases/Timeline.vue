<template>
  <div class="px-3">
    <div class="mt-1">
      <h5 class="my-auto d-inline-block">里程碑</h5>
    </div>
    <hr class="my-4">
    <div>
      <ul class="timeline">
        <template v-for="milestone_box in milestone_boxes" :key="milestone_box.milestone.id">
          <li class="timeline-item mb-5" :class="{ 'active': milestone_box.milestone.id == milestone_id }">
            <div class="text-sm mb-2" :class="{ 'text-muted': milestone_box.milestone.id != milestone_id }">
              <router-link :to="{ query: { milestone_id: milestone_box.milestone.id }}" class="link">{{ h.datetime(milestone_box.milestone.published_at ?? null) ?? '尚未发布' }}</router-link>
            </div>
            {{ milestone_box.milestone.title }}
            <p class="text-muted">
              <PageContent :content="milestone_box.milestone.description ?? ''" />
            </p>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/PageContent.vue'
import * as h from '@/lib/humanize'
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import _ from 'lodash'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const reqs = useRequestList()
const route = useRoute()
const params = route.params as any

const project_id = _.toNumber(params.project_id)
const milestone_id = route.query.milestone_id != null ? _.toNumber(route.query.milestone_id) : null
const milestone_page = reqs.add(q.project.milestones.List, project_id).setup(req => {
  req.query.filter = "available"
}).wait()
await reqs.performAll()

const milestone_boxes = computed(() => milestone_page.value.list)
</script>

<style scoped>
.timeline {
  border-left: 1px solid hsl(0, 0%, 90%);
  position: relative;
  list-style: none;
  padding-left: 20px;

  .timeline-item {
    position: relative;
  }

  .timeline-item:after {
    position: absolute;
    display: block;
    top: 0;
  }

  .timeline-item:after {
    background-color: hsl(0, 0%, 90%);
    left: -26px;
    top: 5px;
    border-radius: 50%;
    height: 11px;
    width: 11px;
    content: "";
  }

  .active:after {
    background-color: hsl(152, 69%, 31%);
  }
}
</style>

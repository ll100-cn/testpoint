<template>
  <div class="">
    <div class="mt-1">
      <h5 class="my-auto d-inline-block">里程碑</h5>
    </div>
    <hr>
    <div>
      <ul class="timeline">
        <template v-for="milestone in milestones">
          <li class="timeline-item mb-5" :class="{ 'active': milestone.id == milestone_id }">
            <div class="small mb-2" :class="{ 'text-muted': milestone.id != milestone_id }">
              <a :href="`${RAILS_RELATIVE_URL_ROOT}projects/${project_id}/test_cases?milestone_id=${milestone.id}`">{{ milestone.published_at == null ? '尚未发布' : utils.humanize(milestone.published_at, DATE_FORMAT) }}</a>
            </div>
            {{ milestone.title }}
            <p class="text-muted">
              <textarea name="content" id="content" data-controller="markdown" readonly class="d-none">
                {{ milestone.description }}
              </textarea>
            </p>
          </li>
        </template>
      </ul>
    </div>
  </div>

</template>

<script setup lang="ts">
import * as requests from '@/requests';
import * as utils from '@/lib/utils';
import { DATE_FORMAT } from '@/constants';
import _ from 'lodash';
import { getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { Milestone } from '@/models';

const { proxy } = getCurrentInstance()
const route = useRoute()

const RAILS_RELATIVE_URL_ROOT = process.env.RAILS_RELATIVE_URL_ROOT

const project_id = _.toNumber(route.params.project_id)
const milestone_id = route.query.milestone_id != null ? _.toNumber(route.query.milestone_id) : null
const milestones = await new requests.MilestoneList().setup(proxy, req => {
  req.interpolations.project_id = project_id
  req.query.filter = "available"
}).perform()

</script>
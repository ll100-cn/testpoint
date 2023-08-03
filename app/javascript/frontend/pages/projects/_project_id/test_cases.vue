<template>
  <div class="row">
    <div class="col col-md-8 col-xl-9">
      <CaseCard :test_cases="test_cases" :project_id="project_id" />
    </div>
    <div class="col col-md-4 col-xl-3">
      <VersionTimeline />
    </div>
  </div>
</template>

<script setup lang="ts">
import CaseCard from './CaseCard.vue'
import VersionTimeline from './VersionTimeline.vue'
import * as requests from '@/requests'
import { getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router'
import _ from 'lodash'

const route = useRoute()
const { proxy } = getCurrentInstance()

const project_id = _.toNumber(route.params.project_id)
const test_cases = await new requests.TestCaseListRequest().setup(req => {
  req.interpolations.project_id = project_id
}).perform(proxy)

const setupd = await (async () => true)()
</script>
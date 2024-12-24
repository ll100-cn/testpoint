<template>
  <div class="mb-3">
    <Card class="mb-2" style="min-height: 10rem;">
      <CardHeader>
        <CardTitle class="me-3">{{ member.name }}</CardTitle>

        <div class="flex-1">
          <Progress preset="standard" :model-value="50">

          </Progress>
        </div>

        <!-- <div class="progress flex-grow-1" style="height: 0.75rem; opacity: 0.7;">
          <template v-for="category in categories" :key="category.id">
            <div v-if="getCount(category, member) != 0" class="progress-bar" :style="`background-color: ${category.color}; width: ${ buildPercentStr(getCount(category, member), total_count) };`" role="progressbar" />
          </template>
        </div> -->
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-3">
          <template v-for="category in categories">
            <span class="text-nowrap">
              <CategoryBadge :category="category" />
              <span class="ms-2">{{ buildPercentStr(getCount(category, member), total_count) }}</span>
            </span>
          </template>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import CategoryBadge from '@/components/CategoryBadge.vue'
import { IssueCreatorChart, Category, Member } from '@/models'
import _ from 'lodash'
import { computed } from 'vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '@/ui'
import { CaretDownIcon } from '@radix-icons/vue'
import CardBody from '../test_cases/CardBody.vue'
import { Progress } from '@/ui'

const props = defineProps<{
  member: Member
  categories: Category[]
  analytics: IssueCreatorChart
}>()

const total_count = computed(() => {
  return _.sumBy(props.analytics.issue_counts, (issue_count) => {
    if (issue_count.creator_id == props.member.id) {
      return issue_count.count
    }
  })
})

function getCount(category: Category, member: Member) {
  return _.find(props.analytics.issue_counts, { category_id: category.id, creator_id: member.id })?.count ?? 0
}

function buildPercentStr(count, total) {
  let result = count / total * 100
  if (_.isNaN(result)) {
    result = 0
  }
  return `${_.floor(result, 2)}%`
}
</script>

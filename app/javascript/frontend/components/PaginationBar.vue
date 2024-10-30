<template>
  <div v-if="pagination" class="flex items-center gap-2 ms-auto">
    <span class="whitespace-nowrap text-sm">共 {{ pagination.total_count }} 条</span>
    <PaginationVue :page="page" :items-per-page="per_size" :total="pagination.total_count" :sibling-count="1" show-edges>
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst>
          <Button :as="RouterLink" class="aspect-square h-9 p-0 text-sm" variant="secondary" preset="ghost" :to="buildPagePath({ page: 1 })">
            <DoubleArrowLeftIcon />
          </Button>
        </PaginationFirst>
        <PaginationPrev>
          <Button :as="RouterLink" class="aspect-square h-9 p-0 text-sm" variant="secondary" preset="ghost" :to="buildPagePath({ page: page - 1 })">
            <ChevronLeftIcon />
          </Button>
        </PaginationPrev>

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button :as="RouterLink" :to="buildPagePath({ page: item.value })" v-if="item.value == page" class="aspect-square h-9 p-0 text-sm" variant="primary">
              {{ item.value }}
            </Button>
            <Button :as="RouterLink" :to="buildPagePath({ page: item.value })" v-else class="aspect-square h-9 p-0 text-sm" variant="muted" preset="ghost">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext>
          <Button :as="RouterLink" :to="buildPagePath({ page: page + 1 })" class="aspect-square h-9 p-0 text-sm" variant="secondary" preset="ghost">
            <ChevronRightIcon />
          </Button>
        </PaginationNext>
        <PaginationLast>
          <Button :as="RouterLink" :to="buildPagePath({ page: _.get(items.at(-1), 'value') })" class="aspect-square h-9 p-0 text-sm" variant="secondary" preset="ghost">
            <DoubleArrowRightIcon />
          </Button>
        </PaginationLast>
      </PaginationList>
    </PaginationVue>
    <Select v-model="per_size" v-if="per_size_enabled">
      <SelectTrigger class="w-auto">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <template v-for="size in [10, 25, 50, 100, 200]">
            <SelectItem :value="size.toString()" class="cursor-pointer text-sm">
              {{ size }} 条/页
            </SelectItem>
          </template>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts" generic="T">
import { Button, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, Pagination as PaginationVue, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/ui"
import * as utils from '@/lib/utils'
import { Pagination } from '@/models'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-icons/vue'
import _ from "lodash"
import { ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()
const query = utils.plainToQuery(route.query)

const props = withDefaults(defineProps<{
  pagination: Pagination<any>
  per_size_enabled?: boolean
}>(), {
  per_size_enabled: true
})

const page = ref(props.pagination?.current_page ?? 1)
const per_size = ref(props.pagination?.limit.toString())

watch(per_size, (new_value) => {
  router.push(buildPagePath({ page: 1, limit: new_value }))
})

function buildPagePath(override: Record<string, any>) {
  const data = utils.compactObject({ ...query, ...override })
  return { query: utils.plainToQuery(data) }
}
</script>

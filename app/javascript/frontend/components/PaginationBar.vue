<template>
  <div v-if="pagination" class="flex items-center gap-2 ms-auto">
    <span class="whitespace-nowrap text-sm">共 {{ pagination.total_count }} 条</span>
    <ButtonProvider preset="ghost" shape="square-rounded" variant="secondary">
      <PaginationVue :page="page" :items-per-page="per_size" :total="pagination.total_count" :sibling-count="1" show-edges>
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst>
            <Button class="text-sm" inherit :to="buildPagePath({ page: 1 })">
              <DoubleArrowLeftIcon />
            </Button>
          </PaginationFirst>
          <PaginationPrev>
            <Button class="text-sm" inherit :to="buildPagePath({ page: page - 1 })">
              <ChevronLeftIcon />
            </Button>
          </PaginationPrev>

          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button :to="buildPagePath({ page: item.value })" class="text-sm" v-if="item.value == page" variant="primary">
                {{ item.value }}
              </Button>
              <Button :to="buildPagePath({ page: item.value })" class="text-sm" v-else inherit>
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" preset="standard" />
          </template>

          <PaginationNext>
            <Button :to="buildPagePath({ page: page + 1 })" class="text-sm" inherit>
              <ChevronRightIcon />
            </Button>
          </PaginationNext>
          <PaginationLast>
            <Button :to="buildPagePath({ page: _.get(items.at(-1), 'value') })" class="text-sm" inherit>
              <DoubleArrowRightIcon />
            </Button>
          </PaginationLast>
        </PaginationList>
      </PaginationVue>
    </ButtonProvider>
    <DropdownMenu v-model="open">
      <DropdownMenuTrigger as-child>
        <Button preset="ghost" variant="secondary" size="sm" class="text-sm -mx-3">
          {{ per_size }} 条/页
          <Icon icon="ci:chevron-down" class="ms-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem inset v-for="size in [10, 25, 50, 100, 200]" as-child>
          <RLink :to="buildPagePath({ limit: size, page: 1 })" active-by="query" active-column="limit" class="group">
            <Icon icon="tabler:check" data-part-indicator class="group-data-[state=inactive]:!hidden" />
            {{ size }} 条/页
          </RLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts" generic="T">
import { Button, ButtonProvider } from "$ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "$ui/dropdown-menu"
import DropdownMenuTrigger from "$ui/dropdown-menu/DropdownMenuTrigger.vue"
import { PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, Pagination as PaginationVue } from "$ui/pagination"
import * as utils from '@/lib/utils'
import { Pagination } from '@/models'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-icons/vue'
import _ from "lodash"
import { ref, watch } from 'vue'
import { onBeforeRouteLeave, RouterLink, useRoute, useRouter } from "vue-router"
import RLink from "./RLink.vue"
import { Icon } from "$ui/input"

const router = useRouter()
const route = useRoute()
const query = utils.plainToQuery(route.query)

const open = ref(false)
onBeforeRouteLeave(() => {
  open.value = false
})

const props = withDefaults(defineProps<{
  pagination: Pagination<any>
  per_size_enabled?: boolean
}>(), {
  per_size_enabled: true
})

const page = ref(props.pagination?.current_page ?? 1)
const per_size = ref(props.pagination?.limit)

watch(per_size, (new_value) => {
  router.push(buildPagePath({ page: 1, limit: new_value }))
})

function buildPagePath(override: Record<string, any>) {
  const data = utils.compactObject({ ...query, ...override })
  return { query: utils.plainToQuery(data) }
}
</script>

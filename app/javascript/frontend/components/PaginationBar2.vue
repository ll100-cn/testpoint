<template>
  <paginate
    v-if="pagination.total_count > 1"
    :value="pagination.current_page"
    :page-count="pagination.total_count"
    first-last-button
    first-button-text="<i class='fal fa-angle-double-left'>"
    last-button-text="<i class='fal fa-angle-double-right'>"
    prev-text="<i class='fal fa-angle-left'>"
    next-text="<i class='fal fa-angle-right'>"
    container-class="pagination"
    page-link-class="page-link"
    prev-class="page-item"
    next-class="page-item"
    prev-link-class="page-link"
    next-link-class="page-link"
    page-class="page-item"
    @input="queryChange({ page: $event })" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { Pagination } from '@/models'
import { PageQuery } from '@/types'
import * as utils from '@/lib/utils'

import Paginate from 'vuejs-paginate/src/components/Paginate.vue'

const router = useRouter()
const route = useRoute()
const query = utils.queryToPlain(route.query)

const props = defineProps<{
  pagination?: Pagination<any>
}>()

function queryChange(page: PageQuery) {
  if (page.items && page.items != props.pagination.limit) {
    page.page = null
  }

  const data = utils.compactObject({ ...query, ...page })
  router.push({ query: utils.plainToQuery(data) })
}

defineExpose({
  queryChange
})

</script>

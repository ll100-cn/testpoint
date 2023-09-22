<template>
  <paginate
    :value="pagination.current_page"
    :page-count="pagination.total_pages"
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
    class="mb-0"
    @input="queryChange($event)" />
</template>

<script setup lang="ts">
import * as utils from '@/lib/utils'
import { Pagination } from '@/models'
import { useRoute, useRouter } from 'vue-router'
import Paginate from 'vuejs-paginate/src/components/Paginate.vue'

const router = useRouter()
const route = useRoute()
const query = utils.queryToPlain(route.query)

const props = defineProps<{
  pagination?: Pagination<any>
}>()

function queryChange(num: number) {
  if (num == 1) {
    num = null
  }
  const data = utils.compactObject({ ...query, page: num })
  router.push({ query: utils.plainToQuery(data) })
}
</script>

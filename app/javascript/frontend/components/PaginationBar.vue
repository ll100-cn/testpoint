<template>
  <paginate
    v-if="pagination.total_count > 0"
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
import { Pagination } from '@/models';
import _ from 'lodash';
import qs from 'qs';
import { PropType } from 'vue';
import { useRouter } from 'vue-router';
import Paginate from 'vuejs-paginate/src/components/Paginate.vue';
import { PageQuery } from '@/types'

const router = useRouter()
const emit = defineEmits<{
  (e: 'clickHandler', page: PageQuery): void
}>()

const props = defineProps({
  pagination: { type: Object as PropType<Pagination<any>>, required: true },
  currentQuery: { type: Object as PropType<PageQuery>, default: () => ({}) },
})

const queryChange = (query: PageQuery) => {
  const finalQuery = _.pickBy(Object.assign(props.currentQuery, query))
  if (query.items && query.items != props.pagination.limit) finalQuery.page = 1
  emit('clickHandler', finalQuery)
  router.push({ query: qs.parse(qs.stringify(finalQuery), { depth: 0 }) as any })
}

defineExpose({
  queryChange
})

</script>

<template>
  <a href="#" class="link-primary" @click.prevent="changeOrder">
    <slot /> {{ order_text }}
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router/auto'
import * as utils from "@/lib/utils"

const model_value = defineModel<string>()

const props = defineProps<{
  code: string
}>()

const route = useRoute()
const router = useRouter()
const query = utils.queryToPlain(route.query)

const sort_data = computed(() => {
  const sorts = model_value.value ?? query.sorts as string
  return sorts?.split(" ") ?? []
})

const order_text = computed(() => {
  if (sort_data.value[0] == props.code) {
    return sort_data.value[1] == "asc" ? "▲" : "▼"
  }

  return ""
})

function changeOrder() {
  query.sorts = props.code + " " + (sort_data.value[1] == "desc" ? "asc" : "desc")
  router.push({ query: utils.plainToQuery(query) })
}
</script>

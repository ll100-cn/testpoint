<template>
  <CaseCard />
</template>

<script setup lang="ts">
import CaseCard from './CaseCard.vue'
import { getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router'
import _ from 'lodash'

const route = useRoute()
const { proxy } = getCurrentInstance()



const setupd = await (async () => true)()
</script>
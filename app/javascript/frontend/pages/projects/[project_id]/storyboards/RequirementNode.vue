<template>
  <Card ref="node" class="w-64" :class="{ 'grayscale hover:grayscale-0 opacity-40 hover:opacity-100': !actived }">
    <CardHeader>
      <div>{{ requirement.title }}</div>
      <template #actions>
        <Button preset="ghost" variant="secondary" size="xs" class="-me-3" v-if="allow('update', requirement)" @click.prevent="emits('edit', requirement)">
          <i class="far fa-pencil-alt" />
        </Button>
      </template>
    </CardHeader>
    <CardContent class="py-2">
      <div class="flex gap-x-2 mb-2" v-if="requirement.platform_ids.length > 0">
        <PlatformBadge v-for="platform_id in requirement.platform_ids" :platform="platform_repo.id.find(platform_id)" />
      </div>

      <div class="text-sm text-muted space-y-2">
         <VueMarkdown :source="requirement.description" />

         <template v-for="label_id in requirement.label_ids">
            <template v-if="requirement.label_descriptions[label_id.toString()]">
              <Well class="block">
                <div class="text-primary">{{ label_repo.find(label_id)?.name }}</div>
                <VueMarkdown :source="requirement.label_descriptions[label_id.toString()]"></VueMarkdown>
              </Well>
            </template>
         </template>
      </div>
    </CardContent>

    <Handle type="target" :position="Position.Left" class="border w-2 h-5 bg-primary/80 rounded contrast-50" />
    <Handle type="source" :position="Position.Right" class="border w-2 h-5 bg-destructive/80 rounded contrast-50" />
  </Card>
</template>

<script setup lang="ts">
import { LabelRepo, Platform, PlatformRepo, Requirement } from '@/models'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '$vendor/ui'
import { Button } from '$vendor/ui'
import { Handle, Position } from '@vue-flow/core'
import { Badge, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "$vendor/ui";
import PlatformBadge from '@/components/PlatformBadge.vue'
import VueMarkdown from 'vue-markdown-render'
import { usePageStore } from '@/store'
import { Filter } from './type'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import * as q from '@/lib/requests'
import { useRoute } from 'vue-router';
import { useElementSize } from '@vueuse/core';
import Well from '$vendor/ui/well/Well.vue';

const page = usePageStore()
const allow = page.inProject()!.allow
const route = useRoute()
const params = route.params as any
const proxy = getCurrentInstance()!.proxy as any

const props = defineProps<{
  requirement: Requirement
  platform_repo: PlatformRepo
  label_repo: LabelRepo
  filter: Filter
}>()

const emits = defineEmits<{
  edit: [requirement: Requirement]
  size: [requirement: Requirement, size: { width: number, height: number }]
}>()

const node = ref(null! as HTMLDivElement)
const { width, height } = useElementSize(node)

const actived = computed(() => {
  return props.filter.platform_id_eq == null || props.requirement.platform_ids.includes(props.filter.platform_id_eq)
})

onMounted(() => {
  emits('size', props.requirement, { width: width.value, height: height.value })
})

</script>
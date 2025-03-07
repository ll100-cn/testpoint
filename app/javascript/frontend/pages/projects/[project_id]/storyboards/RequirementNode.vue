<template>
  <Card ref="node" class="w-72" :class="{ 'grayscale hover:grayscale-0 opacity-40 hover:opacity-100': !actived }">
    <CardHeader>
      <div>
        <span>{{ requirement.title }}</span>
        <span v-if="requirement_stat_repo.find(requirement.id)"> [{{ requirement_stat_repo.find(requirement.id)!.test_cases_count }}]</span>
      </div>
      <template #actions>
        <Button preset="ghost" variant="secondary" size="xs" class="-me-3" v-if="allow('update', requirement)" @click.prevent="emits('edit', requirement)">
          <i class="far fa-pencil-alt" />
        </Button>
      </template>
    </CardHeader>
    <CardContent class="py-2">
      <div class="flex flex-wrap gap-1 mb-2" v-if="requirement.platform_ids.length > 0">
        <PlatformBadge v-for="platform_id in requirement.platform_ids" :platform="platform_repo.id.find(platform_id)" only="icon" />
      </div>

      <div class="text-sm space-y-2">
        <div class="text-muted">
          <VueMarkdown :source="requirement.description" />
        </div>

        <template v-for="label_id in requirement.label_ids">
          <template v-if="requirement.label_descriptions[label_id.toString()]">
            <Collapsible>
              <Callout class="py-1.5 px-2" variant="tint" :style="{ '--color-tint': utils.calcColorHlsValue(label_repo.find(label_id)!.name) }">
                <CollapsibleTrigger as-child><CalloutTitle class="mb-0">{{ label_repo.find(label_id)!.name }}</CalloutTitle></CollapsibleTrigger>
                <CollapsibleContent>
                  <CalloutDescription>
                    <div class="text-muted mt-1">
                      <VueMarkdown :source="requirement.label_descriptions[label_id.toString()]"></VueMarkdown>
                    </div>
                  </CalloutDescription>
                </CollapsibleContent>
              </Callout>
            </Collapsible>
          </template>
        </template>
      </div>
    </CardContent>

    <template v-if="main_axle == 'LR'">
      <Handle type="target" :position="Position.Left" class="border w-2 h-5 bg-card rounded" />
      <Handle type="source" :position="Position.Right" class="border w-2 h-5 bg-card rounded" />
    </template>
    <template v-else-if="main_axle == 'TB'">
      <Handle type="target" :position="Position.Top" class="border w-5 h-2 bg-card rounded" />
      <Handle type="source" :position="Position.Bottom" class="border w-5 h-2 bg-card rounded" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { LabelRepo, Platform, PlatformRepo, Requirement, RequirementStatRepo, SceneRepo } from '@/models'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '@/ui'
import { Button } from '@/ui'
import { Handle, Position } from '@vue-flow/core'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui";
import PlatformBadge from '@/components/PlatformBadge.vue'
import VueMarkdown from 'vue-markdown-render'
import { usePageStore } from '@/store'
import { Filter } from './type'
import { computed } from 'vue'
import { Callout, CalloutTitle, CalloutDescription } from '@/ui'
import * as utils from "@/lib/utils"

const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  requirement: Requirement
  platform_repo: PlatformRepo
  requirement_stat_repo: RequirementStatRepo
  label_repo: LabelRepo
  filter: Filter
  main_axle: string
}>()

const emits = defineEmits<{
  edit: [requirement: Requirement]
}>()

const actived = computed(() => {
  let result = true

  if (props.filter.platform_id_eq != null) {
    result = result && (props.requirement.platform_ids.length == 0 || props.requirement.platform_ids.includes(props.filter.platform_id_eq))
  }

  if (props.filter.label_id_eq != null) {
    result = result && props.requirement.label_ids.includes(props.filter.label_id_eq)
  }

  if (props.filter.relate_stat_eq != null) {
    const relate_stat = props.requirement_stat_repo.find(props.requirement.id)
    if (props.filter.relate_stat_eq == 'related') {
      result = result && relate_stat != null && relate_stat.test_cases_count > 0
    } else {
      result = result && (relate_stat == null || relate_stat?.test_cases_count == 0)
    }
  }

  return result
})

</script>

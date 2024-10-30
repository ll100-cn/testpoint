<template>
  <Alert variant="destructive">
    <VueMarkdown :source="storyboard.description" />
  </Alert>
</template>

<script setup lang="ts">
import { Platform, PlatformRepo, Requirement, Storyboard } from '@/models'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '@/ui'
import { Button } from '@/ui'
import { Handle, Position } from '@vue-flow/core'
import { Badge, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui";
import PlatformBadge from '@/components/PlatformBadge.vue'
import { Alert } from '@/ui';

import VueMarkdown from 'vue-markdown-render'
import { usePageStore } from '@/store';

const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  storyboard: Storyboard
}>()

const emits = defineEmits<{
  edit: [storyboard: Storyboard]
  destroy: [storyboard: Storyboard]
}>()

</script>
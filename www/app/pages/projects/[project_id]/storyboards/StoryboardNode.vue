<template>
  <Alert variant="destructive">
    <VueMarkdown :source="storyboard.description" />
  </Alert>
</template>

<script setup lang="ts">
import { Platform, PlatformRepo, Requirement, Storyboard } from '@/models'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '$ui/card'
import { Button } from '$ui/button'
import { Handle, Position } from '@vue-flow/core'
import { Badge } from '$ui/badge'
import PlatformBadge from '@/components/PlatformBadge.vue'
import { Alert } from '$ui/alert'

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

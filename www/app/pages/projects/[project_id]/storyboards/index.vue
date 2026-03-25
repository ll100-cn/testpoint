<template>
  <Nav preset="tabs">
    <Button v-if="allow('create', Storyboard)" preset="ghost" class="ms-auto" @click.prevent="storyboard_dialog.show(StoryboardCreateDialogContent)">+ 新建需求板</Button>
  </Nav>

  <StoryboardDialog ref="storyboard_dialog" @created="onStoryboardCreated" />
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Nav, NavItem } from '$ui/nav'
import BlankDialog from '@/components/BlankDialog.vue'
import { useQueryLine } from '@/lib/useQueryLine'
import { Storyboard } from '@/models'
import * as q from '@/requests'
import { usePageStore } from '@/store'
import { onActivated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StoryboardCreateDialogContent from './StoryboardCreateDialogContent.vue'
import type { StoryboardFrameComponent } from '@/components/StoryboardFrame'
import PathHelper from '@/lib/PathHelper'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const path_info = PathHelper.parseCollection(route.path, 'index')
const page = usePageStore()
const allow = page.inProject()!.allow

const StoryboardDialog = BlankDialog as typeof BlankDialog & StoryboardFrameComponent
const storyboard_dialog = ref(null! as InstanceType<typeof BlankDialog & StoryboardFrameComponent>)

const project_id = params.project_id

const { data: storyboard_boxes } = line.request(q.project.storyboards.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

onActivated(() => {
  if (storyboard_boxes.value.length > 0) {
    router.replace(`${path_info.collection}/${storyboard_boxes.value[0].storyboard.id}`)
  }
})

function onStoryboardCreated(storyboard: Storyboard) {
  router.push(`${path_info.collection}/${storyboard.id}`)
}
</script>

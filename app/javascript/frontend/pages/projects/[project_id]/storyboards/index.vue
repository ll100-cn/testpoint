<template>
  <Nav>
    <NavList preset="tabs">
      <Button v-if="allow('create', Storyboard)" preset="ghost" class="ms-auto" @click.prevent="storyboard_dialog.show(StoryboardCreateDialogContent)">+ 新建需求板</Button>
    </NavList>
  </Nav>

  <BlankDialog ref="storyboard_dialog" @created="onStoryboardCreated" />
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Nav, NavList } from '$ui/nav'
import useRequestList from '@/lib/useRequestList'
import BlankDialog from '@/components/BlankDialog.vue'
import * as q from '@/requests'
import * as utils from "@/lib/utils"
import { Storyboard } from '@/models'
import { usePageStore } from '@/store'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StoryboardCreateDialogContent from './StoryboardCreateDialogContent.vue'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)
const page = usePageStore()
const allow = page.inProject()!.allow

const storyboard_dialog = ref(null! as InstanceType<typeof BlankDialog>)
const requirement_dialog = ref(null! as InstanceType<typeof BlankDialog>)
const project_id = params.project_id

const storyboards = reqs.add(q.project.storyboards.List).setup(req => {
  req.interpolations.project_id = project_id
}).wait()
await reqs.performAll()

if (storyboards.value.length > 0) {
  router.push(`/projects/${params.project_id}/storyboards/${storyboards.value[0].id}`)
}


function onStoryboardCreated(storyboard: Storyboard) {
  router.push(`/projects/${params.project_id}/storyboards/${storyboard.id}`)
}
</script>

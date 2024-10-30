<template>
  <Nav>
    <NavList preset="tabs">
      <Button v-if="allow('create', Storyboard)" preset="ghost" class="ms-auto" @click.prevent="storyboard_dialog.show(StoryboardCreateDialogContent)">+ 新建需求板</Button>
    </NavList>
  </Nav>

  <BlankDialog ref="storyboard_dialog" @created="onStoryboardCreated" />
</template>

<script setup lang="ts">
import { Button, Nav, NavList } from '@/ui'
import BlankDialog from '@/ui/BlankDialog.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { Storyboard } from '@/models'
import { usePageStore } from '@/store'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StoryboardCreateDialogContent from './StoryboardCreateDialogContent.vue'

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)
const page = usePageStore()
const allow = page.inProject()!.allow

const storyboard_dialog = ref(null! as InstanceType<typeof BlankDialog>)
const requirement_dialog = ref(null! as InstanceType<typeof BlankDialog>)
const project_id = params.project_id

const storyboards = ref(await new q.project.StoryboardReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

if (storyboards.value.length > 0) {
  router.push(`/projects/${params.project_id}/storyboards/${storyboards.value[0].id}`)
}


function onStoryboardCreated(storyboard: Storyboard) {
  router.push(`/projects/${params.project_id}/storyboards/${storyboard.id}`)
}
</script>

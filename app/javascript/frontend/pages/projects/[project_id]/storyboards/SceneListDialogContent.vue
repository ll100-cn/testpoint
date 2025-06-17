<template>
  <DialogContent class="max-w-4xl" :closeable="false" v-if="!loading">
    <DialogHeader>
      <DialogTitle>场景列表</DialogTitle>
    </DialogHeader>

    <FormErrorAlert :validator="validator" />

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#ID</TableHead>
          <TableHead>名称</TableHead>
          <TableHead role="actions"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="scene in scenes">
          <TableCell>{{ scene.id }}</TableCell>
          <TableCell>{{ scene.name }}</TableCell>
          <TableCell role="actions">
            <a href="#" v-if="allow('update', scene)" class="link" @click.prevent="updateScene(scene)">
              <i class="far fa-pencil-alt" /> 修改
            </a>
            <a v-if="allow('destroy', scene)" href="#" v-confirm="'确认删除？'" @click.prevent="deleteScene(scene)" class="link"><i class="far fa-trash-alt" /> 删除</a>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <DialogFooter>
      <Button v-if="allow('create', Scene)" @click.prevent="createScene">创建场景</Button>
    </DialogFooter>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Validator } from '$ui/simple_form'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import type { SceneFrameEmits } from '@/components/SceneFrame'
import { STORYBOARD_MAIN_AXLE } from '@/constants'
import { useQueryLine } from '@/lib/useQueryLine'
import { EntityRepo, Platform, Requirement, Storyboard, Roadmap, Scene } from '@/models'
import * as q from '@/requests'
import { usePageStore } from '@/store'
import * as utils from '@/lib/utils'
import { computed, getCurrentInstance, reactive, ref, type Component } from 'vue'
import { useRoute } from 'vue-router'
import SceneCreateDialogContent from './SceneCreateDialogContent.vue'
import SceneUpdateDialogContent from './SceneUpdateDialogContent.vue'
import vConfirm from '@/components/vConfirm'

const route = useRoute()
const params = route.params as any
const line = useQueryLine()
const open = defineModel('open')
const page = usePageStore()
const allow = page.inProject()!.allow

const emit = defineEmits<SceneFrameEmits & {
  switch: [Component, ...any]
}>()

const scenes = ref([] as Scene[])
const validator = reactive<Validator>(new Validator())

const loading = ref(true)
async function reset(a_scenes: Scene[]) {
  scenes.value = a_scenes
  loading.value = false
}

defineExpose({
  reset
})

function createScene() {
  emit('switch', SceneCreateDialogContent)
}

function updateScene(a_scene: Scene) {
  emit('switch', SceneUpdateDialogContent, a_scene)
}

const { mutateAsync: destroy_scene_action } = line.request(q.project.scenes.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function deleteScene(scene: Scene) {
  try {
    await destroy_scene_action({
      interpolations: {
        project_id: params.project_id,
        storyboard_id: params.storyboard_id,
        scene_id: scene.id
      }
    })
    emit('destroyed', scene)

    scenes.value = scenes.value.filter(scene => scene.id !== scene.id)
  } catch (error) {
    validator.processError(error)
  }
}
</script>

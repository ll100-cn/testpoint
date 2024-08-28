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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="scene in scenes">
          <TableCell>{{ scene.id }}</TableCell>
          <TableCell>{{ scene.name }}</TableCell>
          <TableCell>
            <div class="flex justify-end space-x-3">
              <a href="#" v-if="allow('update', scene)" class="link" @click.prevent="updateScene(scene)">
                <i class="far fa-pencil-alt" /> 修改
              </a>
              <a v-if="allow('destroy', scene)" href="#" @click.prevent="remove(scene)" class="link"><i class="far fa-trash-alt" /> 删除</a>
            </div>
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
import * as q from '@/lib/requests'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'
import { EntityRepo, Platform, Requirement, Storyboard, Roadmap, Scene } from '@/models'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'
import { computed, getCurrentInstance, reactive, ref, type Component } from 'vue'
import { useRoute } from 'vue-router'
import * as utils from '@/lib/utils'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { STORYBOARD_MAIN_AXLE } from '@/constants'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$vendor/ui'
import { usePageStore } from '@/store'
import SceneCreateDialogContent from './SceneCreateDialogContent.vue'
import Validator from '$vendor/ui/simple_form/Validator';
import SceneUpdateDialogContent from './SceneUpdateDialogContent.vue'

const route = useRoute()
const params = route.params as any
const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')
const page = usePageStore()
const allow = page.inProject()!.allow

const emit = defineEmits<{
  switch: [Component, ...any]
  destroyed: [Scene]
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

async function remove(a_scene: Scene) {
  if (!confirm("是否删除场景？")) {
    return
  }

  try {
    await new q.project.SceneReq.Destroy().setup(proxy, (req) => {
      req.interpolations.project_id = params.project_id
      req.interpolations.storyboard_id = params.storyboard_id
      req.interpolations.scene_id = a_scene.id
    }).perform()
    emit('destroyed', a_scene)

    scenes.value = scenes.value.filter(scene => scene.id !== a_scene.id)
  } catch (error) {
    if (validator.processError(error)) {
      return
    }

    throw error
  }
}
</script>
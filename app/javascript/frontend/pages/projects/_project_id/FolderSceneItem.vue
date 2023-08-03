<template>
  <li :class="{ 'has-children': scene_item.children.length > 0 }">
    <a data-bs-toggle="collapse" :href="`#treeview-${scene_item.uuid}`" class="toggler text-muted" :class="{ 'collapsed': collapsed }" v-if="scene_item.children.length > 0">
      <i class="fal fa-plus-square"></i>
    </a>
    <span class=""></span>
    <span class="line"></span>
    <div class="item">

      <a class="treeview-link flex-1 rounded" @click="changeFilter({ ...params, scene_path: scene_item.path })" href="#" :class="{ 'active': highlight }">
        <i class="fal fa-folder me-2"></i> {{ scene_item.name }}
      </a>
      <a class="text-muted ms-2 treeview-active-actions" href="/projects/1/folders/9/edit">
        <i class="fal fa-pencil"></i>
      </a>
    </div>

    <ul :id="`treeview-${scene_item.uuid}`" class="collapse" :class="{ 'show': !collapsed }">
      <template v-for="scene_item in scene_item.children">
        <Self v-bind="props" :scene_item="scene_item" :actived="!collapsed" />
      </template>
    </ul>
  </li>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { inject, PropType } from "vue";
import { ChangeFilterFunction, Filter, SceneItem, TreeItem } from "./types";

const props = defineProps({
  actived: {
    type: Boolean,
    required: true
  },
  scene_item: {
    type: Object as PropType<SceneItem>,
    required: true
  },
  filter: {
    type: Object as PropType<Filter>,
    required: true
  },
  params: {
    type: Object as PropType<Record<string, string>>,
    required: true
  }
})

defineOptions({
  name: "Self"
})

const changeFilter = inject("changeFilter") as ChangeFilterFunction

const collapsed = !props.actived || !_.startsWith(props.filter.scene_path, props.scene_item.path)
const highlight = !collapsed && props.filter.scene_path == props.scene_item.path
</script>
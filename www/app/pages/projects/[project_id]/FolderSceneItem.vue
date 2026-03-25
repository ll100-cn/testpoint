<template>
  <li :class="{ 'has-children': scene_item.children.length > 0 }" class="relative group">
    <div class="flex items-center group-last:relative">
      <div class="absolute top-0 bottom-0 border-l -translate-x-1/2 group-last:bottom-1/2"></div>

      <div class="border-b w-3 box-content" />

      <TreeItemView
        :highlight="highlight"
        :item-title="scene_item.name"
        :item-count="(scene_item.count == 0 || scene_item.count == scene_item.totalCount()) ? scene_item.totalCount() : `${scene_item.count} / ${scene_item.totalCount()}`"
        @click.prevent="changeFilter({ ...params, scenePath: scene_item.path })" />
    </div>

    <ul :id="`treeview-${scene_item.uuid}`" :class="{ 'hidden': collapsed }" class="ms-8">
      <template v-for="child in scene_item.children" :key="child">
        <Self v-bind="props" :scene_item="child" :actived="!collapsed" />
      </template>
    </ul>
  </li>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { computed, inject, type PropType } from "vue";
import { type ChangeFilterFunction, Filter, SceneItem } from "./types";
import TreeItemView from './TreeItemView.vue';

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

const collapsed = computed(() => {
  return !props.actived || !_.isEqual(props.scene_item.path, _.slice(props.filter.scenePath, 0, props.scene_item.path.length))
})

const highlight = computed(() => {
  return !collapsed.value && _.isEqual(props.scene_item.path, props.filter.scenePath)
})
</script>

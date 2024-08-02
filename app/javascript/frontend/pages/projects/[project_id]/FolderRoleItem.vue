<template>
  <li :class="{ 'has-children': role_item.scene_tree.length > 0 }" class="relative group">
    <div class="flex items-center group-last:relative">
      <div class="absolute top-0 left-2 bottom-0 border-l -translate-x-1/2 group-last:bottom-1/2"></div>
      <a class="flex text-muted size-4 bg-white items-center justify-center shrink relative z-10" @click.prevent="toggled = !toggled">
        <i class="absolute fal" :class="toggled ? 'fa-plus-square' : 'fa-minus-square'" />
      </a>

      <div class="border-b -ms-2 ps-2 -me-1 pe-2 box-content" />

      <TreeItemView :highlight="highlight" :item-title="role_item.role_name ?? '未设置'" :item-count="role_item.totalCount()" @click="changeFilter({ ...params, role_name: role_item.role_name ?? '', scene_path: [] })" />
    </div>

    <ul :id="`treeview-${role_item.uuid}`" :class="{ 'hidden': toggled }" class="ms-8">
      <template v-for="scene_item in role_item.scene_tree">
        <FolderSceneItem :scene_item="scene_item" :filter="filter" :actived="!toggled" :params="{ ...params, role_name: role_item.role_name ?? '' }" />
      </template>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { type ChangeFilterFunction, Filter, TreeItem } from "./types"
import FolderSceneItem from "./FolderSceneItem.vue"
import { computed, inject, ref, type PropType } from "vue"
import { Button } from "$vendor/ui";
import TreeItemView from "./TreeItemView.vue";

const props = defineProps({
  actived: {
    type: Boolean,
    required: true
  },
  role_item: {
    type: Object as PropType<TreeItem>,
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

const collapsed = computed(() => {
  return !props.actived || (props.role_item.role_name ?? '') != props.filter.role_name
})

const toggled = ref(collapsed.value)

const highlight = computed(() => {
  return !collapsed.value && (props.filter.scene_path ?? '') == ''
})

const changeFilter = inject("changeFilter") as ChangeFilterFunction
</script>

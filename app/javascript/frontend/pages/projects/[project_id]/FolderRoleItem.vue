<template>
  <li :class="{ 'has-children': role_item.scene_tree.length > 0 }">
    <a data-bs-toggle="collapse" :href="`#treeview-${role_item.uuid}`" class="toggler text-muted" :class="{ 'collapsed': collapsed }">
      <i class="fal fa-plus-square" />
    </a>
    <span class="line" />
    <div class="item">
      <a href="#" class="treeview-link flex-1 rounded" :class="{ 'btn btn-primary active': highlight }" @click="changeFilter({ ...params, role_name: role_item.role_name ?? '', scene_path: [] })">
        <i class="fal fa-folder me-2" />{{ role_item.role_name ?? '未设置' }}
        <span class="small">({{ role_item.totalCount() }})</span>
      </a>
    </div>
    <ul :id="`treeview-${role_item.uuid}`" class="collapse" :class="{ 'show': !collapsed }">
      <template v-for="scene_item in role_item.scene_tree">
        <FolderSceneItem :scene_item="scene_item" :filter="filter" :actived="!collapsed" :params="{ ...params, role_name: role_item.role_name ?? '' }" />
      </template>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ChangeFilterFunction, Filter, TreeItem } from "./types"
import FolderSceneItem from "./FolderSceneItem.vue"
import { computed, inject, PropType } from "vue"

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

const highlight = computed(() => {
  return !collapsed.value && (props.filter.scene_path ?? '') == ''
})

const changeFilter = inject("changeFilter") as ChangeFilterFunction
</script>

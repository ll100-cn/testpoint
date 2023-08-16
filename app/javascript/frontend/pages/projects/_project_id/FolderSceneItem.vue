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
        <span class="small" v-if="scene_item.count == 0 || scene_item.count == scene_item.totalCount()">({{ scene_item.totalCount() }})</span>
        <span class="small" v-else>({{ scene_item.count }}/{{ scene_item.totalCount() }})</span>
      </a>
    </div>

    <ul :id="`treeview-${scene_item.uuid}`" class="collapse" :class="{ 'show': !collapsed }">
      <template v-for="child in scene_item.children">
        <Self v-bind="props" :scene_item="child" :actived="!collapsed" />
      </template>
    </ul>
  </li>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { computed, inject, PropType } from "vue";
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

const collapsed = computed(() => {
  return !props.actived || !_.isEqual(props.scene_item.path, _.slice(props.filter.scene_path, 0, props.scene_item.path.length))
})

const highlight = computed(() => {
  return !collapsed.value && _.isEqual(props.scene_item.path, props.filter.scene_path)
})
</script>
<template>
  <div id="folder-tree" class="treeview mb-3" data-controller="activable">
    <h5 class="text-lg">有效</h5>
    <ul>
      <template v-for="role_item in tree.avaiable" :key="role_item">
        <FolderRoleItem :role_item="role_item" :filter="filter" :params="{ archived: '0', ignored: null }" :actived="filter.archived == '0'" />
      </template>
    </ul>
  </div>

  <div id="folder-tree-2" class="treeview block-archived mb-3" data-controller="activable" v-if="tree.archived.length > 0">
    <h5>归档</h5>
    <ul>
      <template v-for="role_item in tree.archived" :key="role_item">
        <FolderRoleItem :role_item="role_item" :filter="filter" :params="{ archived: '1', ignored: null }" :actived="filter.archived == '1'" />
      </template>
    </ul>
  </div>

  <div id="folder-tree-3" class="treeview block-archived mb-3" data-controller="activable" v-if="tree.ignored.length > 0">
    <h5>忽略</h5>
    <ul>
      <template v-for="role_item in tree.ignored" :key="role_item">
        <FolderRoleItem :role_item="role_item" :filter="filter" :params="{ archived: null, ignored: '1' }" :actived="filter.ignored == '1'" />
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import FolderRoleItem from "./FolderRoleItem.vue";
import { Filter, SceneItem, TreeItem } from "./types";

import { TestCaseStat } from "@/models";
import _ from "lodash";
import UUID from "pure-uuid";
import { PropType, computed } from "vue";

const props = defineProps({
  test_case_stats: {
    type: Array<TestCaseStat>,
    required: true
  },
  filter: {
    type: Object as PropType<Filter>,
    required: true
  }
})

const tree = computed(() => {
  const result = { avaiable: [], archived: [], ignored: [] } as { avaiable: TreeItem[], archived: TreeItem[], ignored: TreeItem[] }

  for (const test_case_stat of props.test_case_stats) {
    let mapping = result[test_case_stat.archived ? "archived" : "avaiable"]
    if (test_case_stat.ignored === true) {
      mapping = result["ignored"]
    }

    let tree_item = mapping.find((it) => it.role_name === test_case_stat.role_name)
    if (!tree_item) {
      tree_item = new TreeItem()
      tree_item.role_name = test_case_stat.role_name
      tree_item.uuid = new UUID(4).format()
      mapping.push(tree_item)
    }

    let scene_tree = tree_item.scene_tree
    for (let i = 0; i < test_case_stat.scene_path.length; i++) {
      const scene_name = test_case_stat.scene_path[i];
      let scene_item = scene_tree.find((it) => it.name === scene_name)

      if (scene_item) {
        scene_tree = scene_item.children
      } else {
        scene_item = new SceneItem()
        scene_item.name = scene_name
        scene_item.path = _.slice(test_case_stat.scene_path, 0, i + 1)
        scene_item.uuid = new UUID(4).format()
        scene_tree.push(scene_item)
        scene_tree = scene_item.children
      }

      if (i === test_case_stat.scene_path.length - 1) {
        scene_item.count = test_case_stat.count
      }
    }
  }

  return result
})

</script>

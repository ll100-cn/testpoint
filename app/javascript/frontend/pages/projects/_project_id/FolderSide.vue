<template>
  <div id="folder-tree" class="treeview mb-3" data-controller="activable">
    <h5>有效</h5>
    <ul>
      <template v-for="role_item in tree.avaiable">
        <FolderRoleItem :role_item="role_item" :filter="filter" :params="{ archived: '0' }" :actived="filter.archived == '0'" />
      </template>
    </ul>
  </div>

  <div id="folder-tree-2" class="treeview block-archived mb-3" data-controller="activable">
    <h5>归档</h5>
    <ul>
      <template v-for="role_item in tree.archived">
        <FolderRoleItem :role_item="role_item" :filter="filter" :params="{ archived: '1' }" :actived="filter.archived == '1'" />
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import FolderRoleItem from "./FolderRoleItem.vue"
import { TreeItem, SceneItem, Filter } from "./types"

import { TestCase, TestCaseStat } from "@/models";
import { computed, PropType } from "vue";
import _ from "lodash"
import UUID from "pure-uuid"

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
  const result = { avaiable: [], archived: [] } as { avaiable: TreeItem[], archived: TreeItem[] }

  for (const test_case_stat of props.test_case_stats) {
    const mapping = result[test_case_stat.archived ? "archived" : "avaiable"]

    let tree_item = mapping.find(it => it.role_name === test_case_stat.role_name)
    if (!tree_item) {
      tree_item = new TreeItem()
      tree_item.role_name = test_case_stat.role_name
      tree_item.uuid = new UUID(4).format()
      mapping.push(tree_item)
    }

    let scene_tree = tree_item.scene_tree
    for (let i = 0; i < test_case_stat.scene_path.length; i++) {
      const scene_name = test_case_stat.scene_path[i];
      let scene_item = scene_tree.find(it => it.name === scene_name)

      if (scene_item) {
        scene_tree = scene_item.children
      } else {
        scene_item = new SceneItem()
        scene_item.name = scene_name
        scene_item.path = _.slice(test_case_stat.scene_path, 0, i + 1).join(" | ")
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
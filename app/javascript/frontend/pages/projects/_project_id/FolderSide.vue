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

import { TestCase } from "@/models";
import { computed, PropType } from "vue";
import _ from "lodash"
import UUID from "pure-uuid"

const props = defineProps({
  test_cases: {
    type: Array<TestCase>,
    required: true
  },
  filter: {
    type: Object as PropType<Filter>,
    required: true
  }
})

const tree = computed(() => {
  const result = { avaiable: [], archived: [] } as { avaiable: TreeItem[], archived: TreeItem[] }

  for (const test_case of props.test_cases) {
    const mapping = result[test_case.archived ? "archived" : "avaiable"]

    let tree_item = mapping.find(it => it.role_name === test_case.role_name)
    if (!tree_item) {
      tree_item = new TreeItem()
      tree_item.role_name = test_case.role_name
      tree_item.uuid = new UUID(4).format()
      mapping.push(tree_item)
    }

    let scene_tree = tree_item.scene_tree
    const scene_names = test_case.scene_name.split(" | ")
    for (let i = 0; i < scene_names.length; i++) {
      const scene_name = scene_names[i];
      const sence_item = scene_tree.find(it => it.name === scene_name)

      if (sence_item) {
        scene_tree = sence_item.children
      } else {
        const new_scene_item = new SceneItem()
        new_scene_item.name = scene_name
        new_scene_item.path = _.slice(scene_names, 0, i + 1).join(" | ")
        new_scene_item.uuid = new UUID(4).format()
        scene_tree.push(new_scene_item)
        scene_tree = new_scene_item.children
      }
    }
  }

  return result
})

</script>
<template>
  <div class="row gy-3">
    <FormErrorAlert />

    <layouts.group code="name" label="名称">
      <controls.string />
    </layouts.group>

    <layouts.group code="trello_list_id" label="trello list id">
      <controls.string />
    </layouts.group>

    <layouts.group code="trello_api_key" label="trello api key">
      <controls.string />
    </layouts.group>

    <layouts.group code="trello_api_token" label="trello api token">
      <controls.string />
    </layouts.group>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
</script>

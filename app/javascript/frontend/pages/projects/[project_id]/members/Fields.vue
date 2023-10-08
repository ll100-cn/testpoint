<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <slot />
    <layouts.group code="nickname" label="昵称">
      <controls.string />
    </layouts.group>
    <layouts.group code="role" label="角色">
      <controls.select include_blank>
        <option value="owner">负责人</option>
        <option value="manager">管理员</option>
        <option value="developer">开发人员</option>
        <option value="reporter">报告人</option>
      </controls.select>
    </layouts.group>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"

</script>

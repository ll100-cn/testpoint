<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <slot />
    <FormGroup path="nickname" label="昵称">
      <controls.string />
    </FormGroup>
    <FormGroup path="role" label="角色">
      <controls.select include_blank>
        <option value="owner">负责人</option>
        <option value="manager">管理员</option>
        <option value="developer">开发人员</option>
        <option value="reporter">报告人</option>
      </controls.select>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
}>()

const { FormGroup } = FormFactory<typeof props.former.form>()

</script>

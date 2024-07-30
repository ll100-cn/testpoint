<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <FormGroup path="name" label="名称">
      <controls.string />
    </FormGroup>
    <FormGroup path="default_assignee_id" label="建议工单受理人">
      <controls.select include_blank>
        <OptionsForMember :collection="members" except_level="reporter" />
      </controls.select>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Member } from '@/models'
import OptionsForMember from "@/components/OptionsForMember.vue"
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import * as controls from '@/components/controls'
import FormGroup from "$vendor/ui/simple_form/FormGroup.vue"

const props = defineProps<{
  former: Former<any>
  project_id: string
  members: Member[]
}>()
</script>

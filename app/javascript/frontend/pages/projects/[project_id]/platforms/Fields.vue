<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <layouts.group code="name" label="名称">
      <controls.string />
    </layouts.group>
    <layouts.group code="default_assignee_id" label="建议工单受理人">
      <controls.select include_blank>
        <OptionsForMember :collection="members" except_level="reporter" />
      </controls.select>
    </layouts.group>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
import { Member } from '@/models'
import OptionsForMember from "@/components/OptionsForMember.vue"

const props = defineProps<{
  project_id: string
  members: Member[]
}>()
</script>

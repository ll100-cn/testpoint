<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <FormGroup path="name" label="名称">
      <controls.String />
    </FormGroup>
    <FormGroup path="icon_svg" label="svg图标">
      <controls.Text />
    </FormGroup>
    <FormGroup path="default_assignee_id" label="建议工单受理人">
      <controls.Select include-blank>
        <OptionsForMember :collection="member_boxes" except_level="reporter" />
      </controls.Select>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Member, MemberBox } from '@/models'
import OptionsForMember from "@/components/OptionsForMember.vue"
import { Former, GenericForm, GenericFormGroup } from "$ui/simple_form"
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
  project_id: string
  member_boxes: MemberBox[]
}>()

const FormGroup = GenericFormGroup<typeof props.former.form>
</script>

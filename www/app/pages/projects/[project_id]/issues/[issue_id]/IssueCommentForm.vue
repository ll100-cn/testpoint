<template>
  <FormErrorAlert />

  <div class="space-y-3">
    <FormGroup path="content" label="内容">
      <controls.Markdown />
    </FormGroup>

    <AttachmentsUploader @changed="onAttachmentsChanged" :attachments="attachments" />
  </div>
</template>

<script setup lang="ts">
import { Attachment } from "@/models"
import AttachmentsUploader from "@/components/AttachmentsUploader.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'

const props = defineProps<{
  former: Former<any>
  attachments: Attachment[]
}>()

const FormGroup = GenericFormGroup<typeof props.former.form>

function onAttachmentsChanged(changes_list: Partial<Attachment>[]) {
  props.former.form.attachments_params = changes_list
}
</script>

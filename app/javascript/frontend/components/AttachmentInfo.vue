<template>
  <Well ref="el" class="flex items-center p-2">
    <div class="me-2" style="width: 3rem">
      <template v-if="attachment.isImage() && attachment.file_url">
        <a :href="attachment.file_url" :data-fancybox="`attachment_${attachment.id}`" target="_blank">
          <div class="aspect-square">
            <img :src="attachment.file_url" class="object-cover size-full">
          </div>
        </a>
      </template>

      <template v-else-if="attachment.isVideo() && attachment.file_url">
        <a :href="attachment.file_url" data-fancybox-trigger="gallery" :data-fancybox="`attachment_${attachment.id}`" target="_blank">
          <div class="relative aspect-square">
            <template v-if="attachment.file_previewable">
              <img :src="attachment.file_preview_url" class="object-cover size-full">
            </template>

            <div class="absolute inset-0 flex items-center justify-center">
              <i class="fal fa-play-circle text-muted text-3xl"></i>
            </div>
          </div>
        </a>
      </template>

      <template v-else>
        <div class="aspect-square flex items-center justify-center">
          <i class="fal fa-file-alt text-muted text-5xl"></i>
        </div>
      </template>
    </div>

    <div class="flex-col grow">
      <div v-if="editing" class="flex items-center">
        <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform()">
          <FormGroup class="mb-0" path="title" label=""><controls.String /></FormGroup>
          <div class="space-x-3">
            <Button>更新</Button>
            <Button variant="secondary" @click.prevent="cancelEdit">取消</Button>
          </div>
        </Form>
      </div>
      <template v-else>
        <div class="flex items-center">
          <span class="me-2">{{ _.truncate(attachment.title, { length: 20 }) }}</span>
          <span v-if="editable" role="button" class="far fa-fw fa-edit ms-auto" @click.prevent="edit" />
        </div>
        <div class="flex items-center">
          <span class="text-secondary">{{ prettyBytes(attachment.file_size) }}</span>
          <a v-if="attachment.file_url" class="clipboard ms-1" :href="attachment.file_url" :download="attachment.title">
            <span class="far fa-fw fa-link text-muted" />
          </a>
          <a v-if="editable" class="ms-auto" href="#" v-confirm="'确认删除附件？'" @click.prevent="deleteAttachment">
            <span class="far fa-fw fa-trash-alt text-muted" />
          </a>
        </div>
      </template>
    </div>
  </Well>
</template>

<script setup lang="ts">
import * as controls from '@/components/controls'
import * as q from '@/requests'
import { Attachment } from "@/models"
import ClipboardJS from "clipboard"
import _ from "lodash"
import prettyBytes from "pretty-bytes"
import { getCurrentInstance, nextTick, onMounted, ref } from "vue"
import { usePageStore } from "@/store"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import Well from "$ui/well/Well.vue"
import { useQueryLine } from '@/lib/useQueryLine'
import vConfirm from '@/components/vConfirm'

const line = useQueryLine()
const page = usePageStore()
const allow = page.inProject()?.allow

const props = withDefaults(defineProps<{
  attachment: Attachment
  editable: boolean
}>(), {
  editable: false
})
const emits = defineEmits<{
  deleted: [attachment: Attachment]
  edited: [attachment: Attachment]
}>()

const el = ref(null! as HTMLElement)
const editing = ref(false)

const former = Former.build({
  title: ""
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_attachment_action } = line.request(q.project.attachments.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: destroy_attachment_action } = line.request(q.project.attachments.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const attachment = await update_attachment_action({
    interpolations: { attachment_id: props.attachment.id },
    body: former.form,
  })

  editing.value = false
  emits('edited', attachment)
}

onMounted(() => {
  nextTick(() => {
    buildClipboard()
  })
})

function buildClipboard() {
  new ClipboardJS(".clipboard", {
    text(trigger: HTMLAnchorElement) {
      return trigger.href
    }
  })
}

function edit() {
  editing.value = true
  former.form.title = props.attachment.title
}

function cancelEdit() {
  editing.value = false
  former.validator.clear()
}

async function deleteAttachment() {
  former.validator.clear()

  try {
    const attachment = await destroy_attachment_action({
      interpolations: { attachment_id: props.attachment.id }
    })
    if (attachment) {
      emits('deleted', attachment)
    }
  } catch (err) {
    former.validator.processError(err)
  }
}
</script>

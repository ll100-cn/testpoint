<template>
  <div class="flex border bg-light p-2 items-center">
    <div class="me-2" style="width: 3rem">
      <template v-if="attachment.isImage() && attachment.file_url">
        <a :href="attachment.file_url" :data-fancybox="`attachment_${attachment.id}`" target="_blank">
          <div class="aspect-square flex items-center justify-center img-thumbnail overflow-hidden">
            <img :src="attachment.file_url" class="h-100 images" alt="">
          </div>
        </a>
      </template>
      <template v-else-if="attachment.isVideo() && attachment.file_url">
        <a :href="attachment.file_url" data-fancybox-trigger="gallery" :data-fancybox="`attachment_${attachment.id}`" target="_blank">
          <div class="aspect-square flex items-center justify-center">
            <template v-if="attachment.file_previewable">
              <img :src="attachment.file_preview_url" class="h-100" alt="">
            </template>
            <template v-else>
              <i class="fal fa-play-circle text-muted" :style="{fontSize: '2.8rem'}"></i>
            </template>
          </div>
        </a>
      </template>
      <template v-else>
        <div class="aspect-square flex items-center justify-center">
          <i class="fal fa-file-alt text-muted" :style="{fontSize: '2.8rem'}"></i>
        </div>
      </template>
    </div>

    <div class="flex-column grow-1">
      <div v-if="editing" class="flex x-actions">
        <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform()">
          <FormGroup path="title" label=""><controls.String /></FormGroup>
          <div class="space-x-3">
            <Button>确定</Button>
            <Button variant="secondary" @click.prevent="exitEditing">取消</Button>
          </div>
        </Form>
      </div>
      <template v-else>
        <div class="flex items-center">
          <span class="me-2">{{ _.truncate(attachment.title, { length: 20 }) }}</span>
          <span role="button" class="far fa-fw fa-edit ms-auto" @click.prevent="enterEditing" />
        </div>
        <div class="flex items-center x-actions">
          <span class="text-secondary">{{ prettyBytes(attachment.file_size) }}</span>
          <a v-if="attachment.file_url" class="clipboard ms-1" :href="attachment.file_url" @click.prevent>
            <span class="far fa-fw fa-link text-muted" />
          </a>
          <a class="ms-auto" href="#" @click.prevent="deleteAttachment">
            <span class="far fa-fw fa-trash-alt text-muted" />
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Attachment } from "@/models"
import ClipboardJS from "clipboard"
import _ from "lodash"
import prettyBytes from "pretty-bytes"
import { nextTick, onMounted, ref } from "vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'

const props = defineProps<{
  attachment: Attachment
}>()

const emit = defineEmits<{
  changed: [Attachment, Partial<Attachment>]
}>()

const editing = ref(false)

const former = Former.build({
  title: props.attachment.title
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const changes = <Partial<Attachment>>{ id: props.attachment.id }
  if (props.attachment.title != this.form.title) {
    changes.title = this.form.title
  }

  editing.value = false
  emit('changed', props.attachment, changes)
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

function enterEditing() {
  editing.value = true
}

function exitEditing() {
  editing.value = false
}

async function deleteAttachment() {
  if (!confirm("确认删除附件？")) {
    return
  }

  emit('changed', props.attachment, { id: undefined })
}
</script>

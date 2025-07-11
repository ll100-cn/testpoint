<template>
  <div>
    <div ref="upload_area" class="p-2 border-8 border-dashed border-silence/50" @dragover.prevent="onAreaDragOver" @dragleave.prevent="onAreaDragLeave" @drop.prevent="onAreaDrop">
      <div class="grid grid-cols-2 gap-4 min-h-36">
        <template v-for="item in items">
          <div>
            <FormAttachmentInfo v-if="item.attachment" :attachment="item.attachment" @changed="onAttachmenChanged" />
            <FormAttachmentUpload v-else :upload_file="item.upload_file" />
          </div>
        </template>
      </div>
      <div class="text-muted small text-end pt-2">
        拖拽上传 或者
        <label class="text-primary c-pointer mb-0">
          本地上传
          <input type="file" class="hidden" multiple @change="onInputFileSelected">
        </label>
        或者
        <a href="#" @click.prevent="clipboardInput" class="link">剪贴板</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { Attachment } from "@/models"
import { type AxiosProgressEvent } from "axios"
import { getCurrentInstance, onMounted, onUnmounted, reactive, ref } from "vue"
import FormAttachmentInfo from "./FormAttachmentInfo.vue"
import FormAttachmentUpload from "./FormAttachmentUpload.vue"
import { UploadFile } from './types'
import { useQueryLine } from '@/lib/useQueryLine'

const props = defineProps<{
  attachments?: Attachment[]
}>()
const line = useQueryLine()

class Item {
  upload_file?: UploadFile
  attachment?: Attachment

  changes = {} as Partial<Attachment>
}

const emit = defineEmits<{
  changed: [list: Partial<Attachment>[]]
}>()

const items = ref([] as Item[])
const upload_area = ref(null! as HTMLElement)

onMounted(() => {
  items.value = (props.attachments ?? []).map(it => {
    const item = new Item()
    item.attachment = it
    item.changes.id = it.id

    return item
  })
})

const { mutateAsync: create_attachment_action } = line.request(q.project.attachments.Create(), (req, it) => {
  return it.useMutation({
    ...req.toMutationConfig(it),
  })
})

async function upload(file: File) {
  if (!file) return

  const upload_file = reactive(new UploadFile(file))
  const item = reactive(new Item())
  item.upload_file = upload_file
  items.value.push(item)

  try {
    const attachment = await create_attachment_action({
      body: { upload_file: upload_file },
    })

    item.attachment = attachment
    item.upload_file = undefined
    onAttachmenChanged(attachment, { id: attachment.id })
  } catch (error: any) {
    if (error.name == "CanceledError") {
      const index = items.value.findIndex((it) => it.upload_file === upload_file)
      if (index !== -1) {
        items.value.splice(index, 1)
      }
      return
    }

    throw error
  }
}

function onAttachmenChanged(attachment: Attachment, changes: Partial<Attachment>) {
  const index = items.value.findIndex((it) => it.attachment?.id === attachment.id)
  items.value[index].changes = changes

  if (changes.id == undefined) {
    items.value.splice(index, 1)
  }

  emit('changed', items.value.map(it => it.changes))
}

function onAreaDragOver() {
  upload_area.value.classList.add('highlight')
}

function onAreaDragLeave() {
  upload_area.value.classList.remove('highlight')
}

function onAreaDrop(event: DragEvent) {
  onAreaDragLeave()
  const files = event.dataTransfer?.files ?? []

  for (const file of files) {
    upload(file)
  }
}

function onInputFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files ?? []

  for (const file of files) {
    upload(file)
  }

  input.value = null
}

async function clipboardInput() {
  try {
    const contents = await navigator.clipboard.read();
    for (const item of contents) {
      const type = item.types.find(it => it.startsWith("image/"))
      if (type) {
        const blob = await item.getType(type)
        const ext = type.split("/")[1]
        const file = new File([blob], `clipboard.${ext}`, { type: type })
        upload(file)
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
}
</script>

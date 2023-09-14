<template>
  <div class="d-flex mb-2">
    <span class="small text-muted">{{ title }}</span>
    <span class="ms-auto" v-if="mode != 'edit'">
      <a href="#" @click.prevent="mode = 'edit'"><i class="far fa-edit"></i></a>
    </span>
  </div>

  <div v-if="mode == 'edit'">
    <FormVertical v-bind="{ former }" @submit.prevent="onSubmit">
      <div class="mb-2">
        <slot name="editable" />
      </div>

      <div class="x-actions">
        <layouts.submit class="btn-sm">更新</layouts.submit>
        <button class="btn btn-sm btn-secondary" @click="mode = 'show'">取消</button>
      </div>
    </FormVertical>
  </div>
  <template v-else>
    <slot />
  </template>
  <hr>
</template>

<script setup lang="ts">
import FormVertical from "@/components/FormVertical.vue"
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { ref } from "vue"

const props = defineProps<{
  code: string
  title: string
  former: Former<Record<string, any>>
}>()

const mode = ref('show' as 'show' | 'edit')

async function onSubmit() {
  await props.former.submit(props.code)
  mode.value = 'show'
}
</script>

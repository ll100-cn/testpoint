<template>
  <div class="d-flex mb-2">
    <span class="small text-muted">{{ title }}</span>
    <span class="ms-auto" v-if="editable">
      <a href="#" @click.prevent="mode = 'edit'" v-if="mode != 'edit'"><i class="far fa-edit"></i></a>
      <a href="#" @click.prevent="mode = 'show'" v-else><i class="far fa-times text-muted"></i></a>
    </span>
  </div>

  <div v-if="mode == 'edit'">
    <layouts.form_vertical v-bind="{ former }" @submit.prevent="onSubmit" :default_wrapper_options="{ size: 'small' }">
      <div class="mb-2">
        <slot name="editable" />
      </div>

      <div class="x-actions x-spacer-2">
        <layouts.submit class="btn-sm">更新</layouts.submit>
        <button class="btn btn-sm btn-secondary" @click="mode = 'show'">取消</button>
      </div>
    </layouts.form_vertical>
  </div>
  <template v-else>
    <slot />
  </template>
  <hr>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { ref } from "vue"

const props = withDefaults(defineProps<{
  code: string
  title: string
  former: Former<Record<string, any>>
  editable?: boolean
}>(), {
  editable: true
})

const mode = ref('show' as 'show' | 'edit')

async function onSubmit() {
  await props.former.submit(props.code)
  mode.value = 'show'
}
</script>

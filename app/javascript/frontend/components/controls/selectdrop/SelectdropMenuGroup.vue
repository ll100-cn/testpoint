<template>
  <div>
    <DropdownMenuLabel preset="plain" v-if="option.disabled">
      <Checkbox class="me-1" v-model:checked="checked" @click.stop disabled v-if="context.multiple" />
      <SelectdropMenuText class="text-muted" :value="option.value" :content="option.content" :child-values="option.children?.map(it => it.value)" />
    </DropdownMenuLabel>
    <DropdownMenuItem v-else class="flex items-center" as="label" @click.prevent="clickEntry">
      <Checkbox class="me-1" v-model:checked="checked" @click.stop v-if="context.multiple" />
      <SelectdropMenuText :value="option.value" :content="option.content" :child-values="option.children?.map(it => it.value)" />
    </DropdownMenuItem>

    <div class="ms-3" v-if="(option.children || []).length > 0">
      <SelectdropMenuItem :option="child" v-for="child in option.children" />
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash"
import { computed, inject, ref } from 'vue'
import { type Props } from "./SelectdropMenuItem.vue"
import SelectdropMenuText from './SelectdropMenuText.vue'
import SelectdropMenuItem from './SelectdropMenuItem.vue'
import { selectdropContextKey } from "./types"
import { Checkbox } from '$vendor/ui'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$vendor/ui'

const props = defineProps<Props>()
const context = inject(selectdropContextKey)!

const checked = computed({
  get(): boolean | 'indeterminate' {
    const childCheckeds = (props.option.children ?? []).map((it) => context.menuValues.has(it.value))

    if (childCheckeds.includes(true)) {
      if (childCheckeds.includes(false)) {
        return 'indeterminate'
      } else {
        return true
      }
    } else {
      return false
    }
  },

  set(newValue: boolean | 'indeterminate') {
    if (typeof newValue == 'boolean') {
      context.menuToggle(props.option.value, newValue, 'checkbox')
    }
  },
})

function clickEntry(event: Event) {
  if (props.option.disabled) {
    event.stopImmediatePropagation()
    return
  }

  context.menuToggle(props.option.value, !checked.value, 'entry')
}
</script>

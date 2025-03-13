<template>
  <DropdownMenuLabel preset="plain" v-if="option.disabled">
    <CheckboxRaw class="me-1" v-model="checked" @click.stop disabled v-if="context.multiple" />
    <SelectdropMenuText class="text-muted" :value="option.value" :content="option.content" :child-values="option.children?.map(it => it.value)" />
  </DropdownMenuLabel>
  <DropdownMenuItem v-else class="flex items-center" as="label" @click.prevent="clickEntry">
    <CheckboxRaw class="me-1" v-model="checked" @click.stop :disabled="option.disabled" v-if="context.multiple"  />
    <SelectdropMenuText :value="option.value" :content="option.content" :child-values="option.children?.map(it => it.value)" />
  </DropdownMenuItem>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { type Props } from "./SelectdropMenuItem.vue";
import SelectdropMenuText from "./SelectdropMenuText.vue";
import { CheckboxRaw } from '$ui/input'
import { selectdropContextKey } from './types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'

const props = defineProps<Props>()
const context = inject(selectdropContextKey)!

const checked = computed<boolean>({
  get() { return context.menuValues.has(props.option.value) },
  set(newValue) { context.menuToggle(props.option.value, newValue, 'checkbox') },
})

function clickEntry(event: Event) {
  context.menuToggle(props.option.value, !checked.value, 'entry')
}
</script>

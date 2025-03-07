<template>
  <DropdownMenu v-model:open="open">
    <DropdownMenuTrigger :class="cn(variance(), 'min-w-48 text-start')" :disabled="presenterConfig.disabled">
      <span v-if="labelItem == null" class="text-muted"></span>
      <span v-else-if="typeof labelItem == 'string'">{{ labelItem }}</span>
      <SelectdropMenuText v-else v-bind="labelItem" />
    </DropdownMenuTrigger>

    <DropdownMenuContent class="max-h-[30em] !overflow-auto min-w-[var(--radix-dropdown-menu-trigger-width)]">
      <DropdownMenuLabel preset="plain" class="text-xs space-x-3" v-if="multiple">
        <a href="#" @click.prevent.stop="selectAll" class="link">全部 ({{ valueMapping.size }})</a>
        <a href="#" @click.prevent.stop="selectNone" class="link">无</a>
      </DropdownMenuLabel>

      <SelectdropMenuItem :option="option" v-for="option in menuOptions" />
      <slot name="menuAfter"></slot>
    </DropdownMenuContent>
  </DropdownMenu>

  <div ref="optionsContainer" style="display: none;">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export type Props = {
  multiple?: boolean
}
</script>

<script setup lang="ts">
import { cva } from "class-variance-authority"
import _ from "lodash"
import { computed, onMounted, onUnmounted, provide, reactive, ref, watch } from 'vue'
import type { SelectdropMenuOption } from "./types"
import SelectdropMenuItem from "./SelectdropMenuItem.vue"
import SelectdropMenuText from "./SelectdropMenuText.vue"
import { relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue, type ControlConfig, type FormPresenterConfig, type SizeType } from '$ui/simple_form/types'
import Validation from '$ui/simple_form/Validation'
import { cn } from '$ui/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'
import { type SelectdropContext, selectdropContextKey, type SelectdropOption } from './types'
import SelectdropItemExtractor from './SelectdropItemExtractor'
import SelectdropOptionHelper from './SelectdropOptionHelper'
import type { ComponentProps } from 'vue-component-type-helpers'

const props = withDefaults(defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>(), {
  multiple: true
})

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel<(string | number)[]>()
const rawModelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
const open = ref(false)
const map = reactive(new Map<string, string>())

const menuValues = reactive(new Set<string>())

watch(menuValues, (newMenuValues) => {
  const newModelValues = new Array<string | number>()
  for (const id of newMenuValues) {
    const option = mapping.get(id)
    if (option?.value != null) {
      newModelValues.push(option.value)
    }
  }

  if (!_.isEqual(newModelValues, rawModelValue.value)) {
    rawModelValue.value = newModelValues
  }
})

function buildMenuValues(values: Array<string | number>) {
  const newMenuValues = new Set<string>()
  if (values == null || values.length == 0) {
    const ids = valueMapping.value.get(null) ?? []
    if (ids.length > 0) {
      newMenuValues.add(ids[0])
    }
  }

  for (const value of values) {
    for (const id of valueMapping.value.get(value) ?? []) {
      newMenuValues.add(id)
      for (const val of helper.descendantIds(id)) { newMenuValues.add(val) }
    }
  }

  if (!_.isEqual(newMenuValues, menuValues)) {
    menuValues.clear()
    for (const id of newMenuValues) {
      menuValues.add(id)
    }
  }
}

watch(rawModelValue, (values) => {
  buildMenuValues(values)
})

function menuToggleValue(id: string, checked: boolean, source: 'checkbox' | 'entry') {
  const option = mapping.get(id)
  if (option == null) { return }

  if (props.multiple == false) {
    menuValues.clear()
    checked = true
  } else if (source == 'entry') {
    menuValues.clear()
  }

  const descendantIds = helper.descendantIds(option.id)

  if (checked) {
    menuValues.add(id)
    for (const val of descendantIds) { menuValues.add(val) }
  } else {
    menuValues.delete(id)
    for (const val of descendantIds) { menuValues.delete(val) }
  }

  const ancestorIds = new Set<string>()
  for (const ancestorId of helper.ancestorIds(option)) {
    ancestorIds.add(ancestorId)
  }

  if (checked) {
    for (const ancestorId of ancestorIds) {
      const ancestor = mapping.get(ancestorId)!
      const children = helper.children(ancestor.id)

      if (_.every(children, (it) => menuValues.has(it.id))) {
        menuValues.add(ancestor.id)
      }
    }
  } else {
    for (const ancestorId of ancestorIds) {
      menuValues.delete(ancestorId)
    }
  }
}

const variance = cva(`
    block w-full rounded-md text-foreground py-0
    border border-border shadow-sm bg-input-background
    disabled:text-muted
    focus:outline-none focus:border-ring focus:ring-4 focus:ring-ring/30
  `,
  {
    variants: {
      size: {
        sm: 'px-3 h-7 text-sm',
        default: 'px-3 h-9',
        lg: 'px-3',
      } satisfies Record<SizeType, string>
    },

    defaultVariants: {
      size: 'default'
    }
  }
)

const optionsContainer = ref(null! as HTMLElement)
const parents = reactive(new Map<string | null, string[]>())
const mapping = reactive(new Map<string, SelectdropOption>())

const extractor = new SelectdropItemExtractor(parents)
const helper = new SelectdropOptionHelper(mapping, parents)

onMounted(() => {
  for (const node of extractor.queryOptions(optionsContainer.value)) {
    extractor.addOption(node)
  }
  extractor.observer.observe(optionsContainer.value, { childList: true, subtree: true })
  buildMenuValues(rawModelValue.value)
})
onUnmounted(() => {
  extractor.observer.disconnect();
})

provide(selectdropContextKey, {
  multiple: props.multiple,
  menuValues: menuValues,
  menuToggle: menuToggleValue,

  register(item) {
    mapping.set(item.id, item)
  },
  unregister(id) {
    mapping.delete(id)
  },
} satisfies SelectdropContext)

const valueMapping = computed(() => {
  const result = new Map<string | number | null, string[]>()
  for (const item of mapping.values()) {
    let value = item.value
    if (value === undefined) {
      value = item.id
    }

    const ids = result.get(value) ?? []
    ids.push(item.id)
    result.set(value, ids)
  }

  return result
})

const menuOptions = computed(() => {
  const result = new Map<string | null, SelectdropMenuOption[]>()

  for (const key of parents.keys()) {
    const children = parents.get(key) ?? []
    for (const id of children) {
      const option = mapping.get(id)
      if (!option) { continue }

      if (!result.has(id)) {
        result.set(id, [])
      }

      if (!result.has(key)) {
        result.set(key, [])
      }

      result.get(key)!.push({
        value: option.id,
        disabled: option.value === undefined,
        content: option.content,
        children: result.get(id)
      })
    }
  }

  return result.get(null) ?? []
})

const labelItem = computed(() => {
  const ids = _.difference(Array.from(menuValues), valueMapping.value.get(null) ?? [])
  if (ids.length == 0) {
    return null
  }

  if (menuValues.size == mapping.size) {
    return "全部"
  }

  const remaining = new Set(ids)
  for (const id of ids) {
    const descendantIds = helper.descendantIds(id)
    for (const descendantId of descendantIds) {
      remaining.delete(descendantId)
    }
  }

  if (remaining.size == 1) {
    const optionId = remaining.values().next().value ?? ""
    const option = mapping.get(optionId)
    const children = helper.children(optionId)
    return { content: option?.content, value: optionId, childValues: children.map(it => it.id) } satisfies ComponentProps<typeof SelectdropMenuText>
  }

  return "已选择 " + ids.length + " 项"
})

function selectAll() {
  for (const val of mapping.keys()) {
    menuValues.add(val)
  }

  open.value = false
}

function selectNone() {
  menuValues.clear()
  open.value = false
}
</script>

<template>
  <DropdownMenuItem>
    <a href="#" @click.prevent="onClick" class="dropdown-item" :class="{ 'active': value == modelValue }">
      <component v-for="child in children" :is="child" />
    </a>
  </DropdownMenuItem>
</template>

<script setup lang="ts">
import { type Ref, inject, onMounted, useSlots } from 'vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui'

const props = defineProps<{
  value: any
}>()

const register = inject("register") as Function
const modelValue = inject("model_value") as Ref<any>

const slots = useSlots()
const children = slots.default()

register(props.value, children)

function onClick() {
  modelValue.value = props.value
}

onMounted(() => {
  console.log("---------1111111111-----------")
  console.log("props.value", props.value)
})

</script>
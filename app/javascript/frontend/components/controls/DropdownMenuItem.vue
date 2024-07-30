<template>
  <a href="#" @click.prevent="onClick" class="dropdown-item" :class="{ 'active': value == modelValue }">
    <component v-for="child in children" :is="child" />
  </a>
</template>

<script setup lang="ts">
import { Ref, inject, useSlots } from 'vue'

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

</script>
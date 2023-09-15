<template>
  <a href="#" @click.prevent="onClick" class="dropdown-item" :class="{ 'active': value == model_value }">
    <component v-for="child in children" :is="child" />
  </a>
</template>

<script setup lang="ts">
import { Ref, inject, useSlots } from 'vue'

const props = defineProps<{
  value: any
}>()

const register = inject("register") as Function
const model_value = inject("model_value") as Ref<any>

const slots = useSlots()
const children = slots.default()

register(props.value, children)

function onClick() {
  console.log("onClick", props.value)
  model_value.value = props.value
}

</script>
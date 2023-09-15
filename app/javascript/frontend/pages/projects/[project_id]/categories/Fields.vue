<template>
  <FormErrorAlert />

  <layouts.group  code="name" label="名称">
    <forms.string />
  </layouts.group>
  <layouts.group  code="description" label="描述">
    <forms.text />
  </layouts.group>
  <layouts.group  code="color" label="颜色">
    <forms.color />
  </layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { forms, layouts } from "@/components/simple_form"
</script>

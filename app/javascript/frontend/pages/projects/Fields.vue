<template>
  <FormErrorAlert />

  <layouts.group code="name" label="名称">
    <forms.string />
  </layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { forms, layouts } from "@/components/simple_form"
</script>

<template>
  <FormErrorAlert />

  <layouts.group code="title" label="标题"><forms.string /></layouts.group>
  <layouts.group code="published_at" label="发布时间"><forms.string /></layouts.group>
  <layouts.group code="description" label="描述"><forms.text /></layouts.group>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { forms, layouts } from '@/components/simple_form'
</script>

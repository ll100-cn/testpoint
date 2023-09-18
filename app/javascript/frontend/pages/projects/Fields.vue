<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <layouts.group code="name" label="名称">
      <controls.string />
    </layouts.group>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
</script>

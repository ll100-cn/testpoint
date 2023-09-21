<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <layouts.group code="email" label="用户邮箱">
      <div v-if="props.mode == 'edit'" class="form-control-plaintext">{{ former.form.email }}</div>
      <controls.string v-else />
    </layouts.group>
    <layouts.group code="name" label="名称">
      <controls.string />
    </layouts.group>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"

const props = defineProps<{
  mode?: "edit" | "new"
  former: Former<Record<string, any>>
}>()

</script>

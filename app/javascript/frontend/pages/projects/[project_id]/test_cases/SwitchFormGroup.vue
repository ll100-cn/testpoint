<template>
  <div class="flex items-center">
    <input v-model="enableds[code]" class="form-check-input" type="checkbox" role="switch">

    <FormGroup :path="code" :label="label" class="flex-1" :disabled="!enableds[code]">
      <slot />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form';

const props = defineProps<{
  label: string
  code: string
  enableds: Record<string, boolean>
  former: Former<any>
}>()

const Form = GenericForm<typeof props.former.form>
const FormGroup = GenericFormGroup<typeof props.former.form>

</script>

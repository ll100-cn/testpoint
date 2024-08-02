<template>
  <optgroup v-for="group in grouped_members" :label="group[0].role_text">
    <option v-for="member in group" :value="member.id">
      {{ member.name }}
      <span v-if="member.archived_at">(已归档)</span>
    </option>
  </optgroup>
</template>

<script setup lang="ts">
import { Member, Role } from '@/models'
import _ from 'lodash'
import { type Ref, computed, inject } from 'vue'

const props = defineProps<{
  collection: Member[]
  except_level?: Member['role']
}>()

const model_value = inject('model_value') as Ref<number | null>

const grouped_members = computed(() => {
  return _.groupBy(available_members.value, it => it.role)
})

const available_members = computed(() => {
  return props.collection.filter(it => {

    if (it.id == model_value.value) {
      return true
    }

    if (it.archived_at) {
      return false
    }

    if (props.except_level != null && Role[props.except_level] >= Role[it.role]) {
      return false
    }

    return true
  })
})
</script>
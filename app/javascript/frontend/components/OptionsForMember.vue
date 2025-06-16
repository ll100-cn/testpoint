<template>
  <optgroup v-for="group in grouped_member_boxes" :label="group[0].member.role_text">
    <option v-for="member_box in group" :value="member_box.member.id">
      {{ member_box.member.name }}
      <span v-if="member_box.member.archived_at">(已归档)</span>
    </option>
  </optgroup>
</template>

<script setup lang="ts">
import { useControlValue } from '$ui/simple_form'
import { Member, type MemberBox, Role } from '@/models'
import _ from 'lodash'
import { type Ref, computed, inject } from 'vue'

const props = defineProps<{
  collection: MemberBox[]
  except_level?: Member['role']
}>()

const modelValue = useControlValue<number | null>()

const grouped_member_boxes = computed(() => {
  return _.groupBy(available_member_boxes.value, it => it.member.role)
})

const available_member_boxes = computed(() => {
  return props.collection.filter(it => {
    const member = it.member

    if (member.id == modelValue.value) {
      return true
    }

    if (member.archived_at) {
      return false
    }

    if (props.except_level != null && Role[props.except_level] >= Role[member.role]) {
      return false
    }

    return true
  })
})
</script>

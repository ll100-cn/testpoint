<template>
  <form @submit="submitForm">
    <div class="modal-body">
      <div class="alert alert-danger" role="alert" v-if="validations.isAvaliableInvalid()">
        <div v-for="message in validations.avaliableFullMessages()">
          {{ message }}
        </div>
      </div>
      <component :is="layouts.vertical_group" :validation="validations.disconnect('role_name')" label="角色" v-slot="slotProps">
        <component :is="forms.string" v-bind="{ ...slotProps, form }" />
      </component>

      <component :is="layouts.vertical_group" :validation="validations.disconnect('scene_name')" label="场景" v-slot="slotProps">
        <component :is="forms.string" v-bind="{ ...slotProps, form }" />
      </component>

      <component :is="layouts.vertical_group" :validation="validations.disconnect('group_name')" label="分组" v-slot="slotProps">
        <component :is="forms.string" v-bind="{ ...slotProps, form }" />
      </component>

      <component :is="layouts.vertical_group" :validation="validations.disconnect('title')" label="标题" v-slot="slotProps">
        <component :is="forms.string" v-bind="{ ...slotProps, form }" />
      </component>

      <component :is="layouts.vertical_group" :validation="validations.disconnect('content')" label="内容" v-slot="slotProps">
        <textarea class="form-control text optional markdown-field" name="content" id="test_case_content" v-model="form.content"></textarea>
      </component>

      <component :is="layouts.vertical_group" :validation="validations.disconnect('platform_ids')" label="平台" v-slot="slotProps">
        <component :is="forms.checkboxes" v-bind="{ ...slotProps, form, name: 'platform_ids[]', collection: platform_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
      </component>

      <component :is="layouts.vertical_group" :validation="validations.disconnect('label_ids')" label="标签" v-slot="slotProps">
        <component :is="forms.checkboxes" v-bind="{ ...slotProps, form, name: 'label_ids[]', collection: label_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
      </component>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">保存</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models';
import { PropType, getCurrentInstance } from 'vue';

import { Validations, forms, layouts } from "@/components/simple_form";

const props = defineProps({
  platform_repo: {
    type: Object as PropType<EntityRepo<Platform>>,
    required: true
  },
  label_repo: {
    type: Object as PropType<EntityRepo<TestCaseLabel>>,
    required: true
  },
  form: {
    type: Object,
    required: true
  },
  validations: {
    type: Object as PropType<Validations>,
    required: false
  }
})

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void,
  (e: 'destroy', test_case: TestCase): void,
  (e: 'create', event: Event): void,
}>()

async function submitForm(event: Event) {
  emit('create', event)
}
</script>

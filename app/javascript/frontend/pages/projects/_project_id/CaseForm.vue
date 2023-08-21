<template>
  <form @submit="submitForm">
    <div class="modal-body">
      <FormExtraErrorAlert :validations="validations" />

      <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('role_name')" label="角色">
        <component :is="forms.string" v-bind="{ ...slotProps, form }" />
      </component>

      <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('scene_name')" label="场景">
        <component :is="forms.string" v-bind="{ ...slotProps, form }" />
      </component>

      <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('group_name')" label="分组">
        <component :is="forms.string" v-bind="{ ...slotProps, form }" />
      </component>

      <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('title')" label="标题">
        <component :is="forms.string" v-bind="{ ...slotProps, form }" />
      </component>

      <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('content')" label="内容">
        <textarea id="test_case_content" v-model="form.content" class="form-control text optional markdown-field" name="content" />
      </component>

      <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('platform_ids')" label="平台">
        <component :is="forms.checkboxes" v-bind="{ ...slotProps, form, name: 'platform_ids[]', collection: platform_repo.values(), labelMethod: 'name', valueMethod: 'id' }" />
      </component>

      <component :is="layouts.vertical_group" v-slot="slotProps" :validation="validations.disconnect('label_ids')" label="标签">
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
import { PropType } from 'vue';

import { Validations, forms, layouts } from "@/components/simple_form";
import FormExtraErrorAlert from '@/components/FormExtraErrorAlert.vue';

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

<template>
  <DialogContent class="max-w-4xl" v-if="!loading" :closeable="false">
    <DialogHeader>
      <DialogTitle>
        #{{ test_case.id }}
        <span v-if="test_case.group_name" class="me-1">[{{ test_case.group_name }}]</span>
        {{ test_case.title }}
      </DialogTitle>

      <template v-if="!readonly" #actions>
        <a v-if="allow('update', test_case)" href="#" class="link" @click.prevent="emit('switch', CaseEditDialogContent, test_case)">编辑</a>
      </template>
    </DialogHeader>

    <PageContent :content="test_case.content" />

    <div class="text-center p-1" :class="{ 'hidden': !collapsed }">
      <Button preset="ghost" @click="collapsed=false">
        <i class="far fa-history me-1" />显示历史版本
      </Button>
    </div>

    <div class="mt-4" :class="{ 'hidden': collapsed }">
      <div v-for="(version_case, index) in history" class="border p-4 -mb-px">
        <Collapsible>
          <CollapsibleTrigger as-child>
            <div class="flex">
              <div>{{ h.datetime(version_case.updated_at) }}</div>
              <div class="ms-auto"><i class="fa-regular fa-chevron-down"></i></div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <hr class="my-3">
            <PageContent :content="version_case.content" class="mt-2" />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
    <DialogFooter>
      <DialogClose>
        <Button type="button" class="btn btn-secondary">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</template>

<script setup lang="ts">
import * as h from '@/lib/humanize'
import * as q from '@/requests'
import { TestCase } from '@/models'
import { usePageStore } from '@/store'
import { type Component, getCurrentInstance, nextTick, onUpdated, ref } from 'vue'
import CaseEditDialogContent from './CaseEditDialogContent.vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { Well } from '$ui/well'
import Button from '$ui/button/Button.vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$ui/collapsible'
import PageContent from '@/components/PageContent.vue'
import { useQueryLine } from '@/lib/useQueryLine'


const props = defineProps<{
  readonly: boolean
}>()

const emit = defineEmits<{
  switch: [ compoenent: Component, ...args: any[] ]
}>()

const page = usePageStore()
const allow = page.inProject()!.allow
const line = useQueryLine()

const textarea = ref()
const collapsed = ref(true)

const loading = ref(true)
const test_case = ref(null! as TestCase)
const history = ref([] as TestCase[])

async function reset(a_test_case: TestCase) {
  loading.value = true
  test_case.value = a_test_case

  const { data: history_page, suspense } = line.request(q.case.test_cases.History, (req, it) => {
    req.interpolations.project_id = a_test_case.project_id
    req.interpolations.id = a_test_case.id
    return it.useQuery(req.toQueryConfig())
  })
  await suspense()
  history.value = history_page.value.list.map(it => it.test_case)

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })

onUpdated(() => {
  if (textarea.value) {
    textarea.value.dispatchEvent(new Event('render'))
  }
})

</script>

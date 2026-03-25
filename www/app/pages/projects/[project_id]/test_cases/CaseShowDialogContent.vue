<template>
  <DialogContent class="max-w-4xl" v-if="!loading" :closeable="false">
    <DialogHeader>
      <DialogTitle>
        #{{ test_case.id }}
        <span v-if="test_case.groupName" class="me-1">[{{ test_case.groupName }}]</span>
        {{ test_case.title }}
      </DialogTitle>

      <template v-if="!readonly" #actions>
        <a v-if="allow('update', test_case)" href="#" class="link" @click.prevent="emit('switch', CaseEditDialogContent, test_case)">编辑</a>
      </template>
    </DialogHeader>

    <PageContent :content="test_case.content" />

    <div class="text-center p-1" :class="{ 'hidden': !collapsed }">
      <Button preset="ghost" @click.prevent="collapsed=false">
        <i class="far fa-history me-1" />显示历史版本
      </Button>
    </div>

    <div class="mt-4" :class="{ 'hidden': collapsed }">
      <div v-for="(version_case, index) in history" class="border p-4 -mb-px">
        <Collapsible>
          <CollapsibleTrigger as-child>
            <div class="flex">
              <div>{{ h.datetime(version_case.updatedAt) }}</div>
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
import Button from '$ui/button/Button.vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$ui/collapsible'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import PageContent from '@/components/PageContent.vue'
import * as h from '@/lib/humanize'
import { useQueryLine } from '@/lib/useQueryLine'
import { TestCase } from '@/models'
import * as q from '@/requests'
import { usePageStore } from '@/store'
import { type Component, nextTick, onUpdated, ref } from 'vue'
import CaseEditDialogContent from './CaseEditDialogContent.vue'


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

  const { data: history_page, suspense } = line.request(q.case.test_cases.History(), (req, it) => {
    req.interpolations.project_id = a_test_case.projectId
    req.interpolations.id = a_test_case.id
    return it.useQuery(req.toQueryConfig())
  })
  await suspense()
  history.value = history_page.value.list.map(it => it.testCase)

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

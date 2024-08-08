<template>
  <PageHeader>
    <PageTitle>{{ storyboard.title }}</PageTitle>
  </PageHeader>

  <Nav v-model:model-value="storyboard.id">
    <NavList preset="tabs">
      <NavItem v-for="storyboard in storyboards" :value="storyboard.id" @click.prevent="changeStoryboard(storyboard)">{{ storyboard.title }}</NavItem>
      <Button v-if="allow('create', Storyboard)" preset="ghost" class="ms-auto" @click.prevent="storyboard_dialog.show(StoryboardCreateDialogContent)">+ 新建需求板</Button>
    </NavList>
  </Nav>

  <Card class="min-h-96 flex-1 rounded-ss-none">
    <CardHeader class="bg-transparent">
      <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform()" size="sm">
        <FormGroup path="platform_id_eq" label="平台">
          <controls.Selectpicker include-blank="任意">
            <SelectdropItem v-for="platform in platforms" :value="platform.id">
              <span class="fas fa-circle me-2 small" :style="{ color: utils.calcColorHex(platform.name) }" />
              {{ platform.name }}
            </SelectdropItem>
          </controls.Selectpicker>
        </FormGroup>
      </Form>

      <template #actions>
        <Button preset="ghost" v-if="allow('update', storyboard)" @click.prevent="storyboard_dialog.show(StoryboardUpdateDialogContent, storyboard)">编辑</Button>
        <Button v-if="allow('create', Requirement)" @click.prevent="requirement_dialog.show(RequirementCreateDialogContent, platforms)">新建需求</Button>
      </template>
    </CardHeader>

    <div ref="vueFlowContainer" class="flex-1">
      <div :style="{ height: `${height}px` }">
        <VueFlow :nodes="nodes" :edges="edges" @edges-change="onEdgesChanged" @connect="onConnect" class="basic-flow">
          <Background />

          <template #node-requirement="slotProps">
            <RequirementNode
              :platform_repo="platform_repo"
              :requirement="slotProps.data"
              :filter="former.form"
              @edit="requirement_dialog.show(RequirementUpdateDialogContent, $event)" />
          </template>
          <template #node-storyboard="slotProps">
            <StoryboardNode
              :storyboard="slotProps.data"
              @edit="storyboard_dialog.show(StoryboardUpdateDialogContent, $event)" />
          </template>
          <Controls />
        </VueFlow>
      </div>
    </div>
  </Card>

  <BlankDialog ref="storyboard_dialog" @created="onStoryboardCreated" @updated="onStoryboardUpdated" @destroyed="onStoryboardDestroyed" />
  <BlankDialog ref="requirement_dialog" @created="onRequirementCreated" @updated="onRequirementUpdated" @destroyed="onRequirementDestroyed" :platforms="platforms" :storyboard_id="storyboard_id" />
  </template>

  <script setup lang="ts">
  import PageHeader from '@/components/PageHeader.vue'
  import PageTitle from '@/components/PageTitle.vue'
  import BlankDialog from '$vendor/ui/BlankDialog.vue'
  import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue'
  import { Button } from '$vendor/ui'
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '$vendor/ui'
  import { Nav, NavList, NavItem } from '$vendor/ui'
  import * as q from '@/lib/requests'
  import { useRoute, useRouter } from 'vue-router'
  import { usePageStore } from '@/store'
  import { PlatformRepo, Requirement, Storyboard } from '@/models'
  import * as utils from "@/lib/utils"
  import type { Connection, Edge, EdgeChange, Node } from '@vue-flow/core'
  import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
  import { Controls } from '@vue-flow/controls'
  import RequirementNode from './RequirementNode.vue'
  import StoryboardNode from './StoryboardNode.vue'
  import StoryboardCreateDialogContent from './StoryboardCreateDialogContent.vue'
  import StoryboardUpdateDialogContent from './StoryboardUpdateDialogContent.vue'
  import RequirementCreateDialogContent from './RequirementCreateDialogContent.vue'
  import RequirementUpdateDialogContent from './RequirementUpdateDialogContent.vue'
  import dagre from '@dagrejs/dagre'
  import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
  import * as controls from '@/components/controls'
  import { Filter } from './type'
  import SelectdropItem from '@/components/controls/selectdrop/SelectdropItem.vue'
  import { Actioner } from '@/components/Actioner'
  import ActionerAlert from '@/components/ActionerAlert.vue'
  import { useElementSize } from '@vueuse/core'
  import { Background } from '@vue-flow/background'

  const proxy = getCurrentInstance()!.proxy!
  const route = useRoute()
  const router = useRouter()
  const params = route.params as any
  const query = utils.queryToPlain(route.query)
  const page = usePageStore()
  const allow = page.inProject()!.allow

  const storyboard_dialog = ref(null! as InstanceType<typeof BlankDialog>)
  const requirement_dialog = ref(null! as InstanceType<typeof BlankDialog>)
  const project_id = params.project_id

  const vueFlowContainer = ref(null! as HTMLDivElement)
  const { width, height } = useElementSize(vueFlowContainer)

  const { updateNodeData, addNodes, addEdges, fitView } = useVueFlow()

  const platforms = ref(await new q.project.PlatformReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = params.project_id
  }).perform())

  const storyboards = ref(await new q.project.StoryboardReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform())

  const storyboard = ref(await new q.project.StoryboardReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.storyboard_id = params.storyboard_id
  }).perform())

  const requirements = ref(await new q.project.RequirementReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.storyboard_id = storyboard.value.id
  }).perform())

  const edges = ref([] as Edge[])
  const nodes = ref([] as Node[])
  parseDataAndLayout(requirements.value)

  function parseDataAndLayout(requirements: Requirement[]) {
    const preNodes = [] as Node[]
    const preEdges = [] as Edge[]

    for (let i = 0 ;i < requirements.length; i++) {
      const requirement = requirements[i]
      preNodes.push({
        id: requirement.id.toString(),
        position: { x: 100 * i, y: 50  },
        data: requirement,
        type: 'requirement'
      })

      for (const upstream_id of requirement.upstream_ids) {
        preEdges.push({
          id: `${requirement.id}-${upstream_id}`,
          source: upstream_id.toString(),
          target: requirement.id.toString()
        })
      }
    }

    edges.value = preEdges
    nodes.value = layoutNodes(preNodes, preEdges)

    if (storyboard.value!.description) {
      nodes.value.push({
        id: `storyboard_${storyboard.value!.id}`,
        position: { x: 10, y: 10 },
        data: storyboard.value,
        type: 'storyboard'
      })
    }
  }

  function layoutNodes(nodes: Node[], edges: Edge[]): Node[] {
    var g = new dagre.graphlib.Graph()
    g.setGraph({ rankdir: 'LR' })
    g.setDefaultEdgeLabel(function() { return {} })

    nodes.forEach((node) => {
      g.setNode(node.id, { width: 260, height: 120 })
    })

    edges.forEach((edge) => {
      g.setEdge(edge.source, edge.target)
    })

    dagre.layout(g)

    g.nodes().forEach(function(node_id) {
      let node = g.node(node_id)
      let original_node = nodes.find(node => node.id == node_id)
      if (original_node) {
        original_node.position.x = node.x
        original_node.position.y = node.y
      }
    })

    return nodes
  }

  const platform_repo = computed(() => {
    return new PlatformRepo().setup(platforms.value)
  })

  function onStoryboardCreated() {
    router.go(0)
  }

  function onStoryboardUpdated(a_storyboard: Storyboard) {
    storyboards.value = storyboards.value.map((s) => s.id === a_storyboard.id ? a_storyboard : s)
    if (storyboard_id.value === a_storyboard.id.toString()) {
      storyboard.value = a_storyboard
    }

    updateNodeData(`storyboard_${a_storyboard.id}`, a_storyboard)
  }

  function onStoryboardDestroyed(a_storyboard: Storyboard) {
    router.push(`/projects/${params.project_id}/storyboards`)
  }

  function changeStoryboard(a_storyboard: Storyboard) {
    query.storyboard_id = a_storyboard.id
    router.push({ query: utils.plainToQuery(query) })
  }

  function onConnect(connection: Connection) {
    const requirement = requirements.value.find((r) => r.id.toString() === connection.target)
    if (!requirement) {
      return
    }

    const new_upstream_id = parseInt(connection.source)
    if (requirement.upstream_ids.includes(new_upstream_id)) {
      return
    }

    updateRequirement(requirement, { upstream_ids: [...requirement.upstream_ids, new_upstream_id] })
    addEdges([{
      id: `${requirement.id}-${new_upstream_id}`,
      source: new_upstream_id.toString(),
      target: requirement.id.toString()
    }])
  }

  function onEdgesChanged(changes: EdgeChange[]) {
    for (const change of changes) {
      if (change.type != 'remove') {
        continue
      }

      const requirement = requirements.value.find((r) => r.id.toString() === change.target)
      if (!requirement) {
        continue
      }

      const old_upstream_id = parseInt(change.source)
      if (requirement.upstream_ids.includes(old_upstream_id)) {
        updateRequirement(requirement, { upstream_ids: requirement.upstream_ids.filter((id) => id !== old_upstream_id), ts: 1 })
      }
    }
  }

  async function updateRequirement(requirement: Requirement, data: any) {
    const a_requirement = await new q.project.RequirementReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = params.project_id
      req.interpolations.storyboard_id = storyboard.value.id
      req.interpolations.requirement_id = requirement.id
    }).perform(data)

    requirements.value = requirements.value.map((r) => r.id === a_requirement.id ? a_requirement : r)
    updateNodeData(a_requirement.id.toString(), a_requirement)
  }

  function onRequirementCreated(new_requirement: Requirement) {
    requirements.value.push(new_requirement)
    parseDataAndLayout(requirements.value)
  }

  function onRequirementUpdated(a_requirement: Requirement) {
    requirements.value = requirements.value.map((r) => r.id === a_requirement.id ? a_requirement : r)
    updateNodeData(a_requirement.id.toString(), a_requirement)
  }

  function onRequirementDestroyed(a_requirement: Requirement) {
    requirements.value = requirements.value.filter((r) => r.id !== a_requirement.id)
    parseDataAndLayout(requirements.value)
  }

  const former = Former.build(new Filter())
  const { Form, FormGroup } = FormFactory<typeof former.form>()
  </script>
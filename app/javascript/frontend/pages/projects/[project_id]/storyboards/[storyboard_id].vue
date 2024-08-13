<template>
  <PageHeader>
    <PageTitle>需求板</PageTitle>
    <template #actions>
      <Button v-if="allow('create', Roadmap)" preset="ghost" class="ms-auto" @click.prevent="roadmap_dialog.show(RoadmapCreateDialogContent)">+ 新建线路图</Button>
    </template>
  </PageHeader>

  <div class="flex items-center -mb-px">
    <div class="overflow-y-auto scrollbar-none">
      <Nav v-model:model-value="storyboard.id">
        <NavList preset="tabs">
          <NavItem v-for="storyboard in storyboards" :value="storyboard.id" class="shrink-0" as-child>
            <RLink :to="`/projects/${params.project_id}/storyboards/${storyboard.id}`">{{ storyboard.title }}</RLink>
          </NavItem>
        </NavList>
      </Nav>
    </div>
    <Button v-if="allow('create', Storyboard)" preset="ghost" class="ms-auto" @click.prevent="storyboard_dialog.show(StoryboardCreateDialogContent)">+ 新建需求板</Button>
  </div>

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
        <FormGroup path="label_id_eq" label="标签">
          <controls.Selectpicker include-blank="任意">
            <SelectdropItem v-for="label in test_case_labels" :value="label.id">
              {{ label.name }}
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
        <VueFlow :nodes="nodes" :edges="edges" @edges-change="onEdgesChanged" @connect="onConnect" :snap-grid="[10, 10]" snap-to-grid fit-view-on-init :max-zoom="1">
          <Background />

          <template #node-requirement="slotProps">
            <RequirementNode
              :platform_repo="platform_repo"
              :label_repo="label_repo"
              :requirement="slotProps.data.requirement"
              :filter="former.form"
              :main_axle="storyboard.main_axle"
              @edit="requirement_dialog.show(RequirementUpdateDialogContent, $event)"
              @size="resizeRequirement" />

          </template>
          <template #node-storyboard="slotProps">
            <StoryboardNode
              :storyboard="slotProps.data"
              @edit="storyboard_dialog.show(StoryboardUpdateDialogContent, $event)" />
          </template>

          <Controls>
            <button class="vue-flow__controls-button" @click.prevent="relayout">
              <i class="fa-regular fa-chart-tree-map text-xs"></i>
            </button>
            <button class="vue-flow__controls-button" @click.prevent="save">
              <i class="fa-regular fa-floppy-disk text-xs"></i>
            </button>
          </Controls>
        </VueFlow>
      </div>
    </div>
  </Card>

  <BlankDialog ref="storyboard_dialog" @created="onStoryboardCreated" @updated="onStoryboardUpdated" @destroyed="onStoryboardDestroyed" />
  <BlankDialog
    ref="requirement_dialog"
    @created="onRequirementCreated"
    @updated="onRequirementUpdated"
    @destroyed="onRequirementDestroyed"
    :platforms="platforms"
    :test_case_labels="test_case_labels"
    :storyboard="storyboard" />
  <BlankDialog ref="roadmap_dialog" />
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
  import { LabelRepo, PlatformRepo, Requirement, Storyboard, Roadmap } from '@/models'
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
  import { debounce, size } from 'lodash'
  import RLink from '@/components/RLink.vue'
  import RoadmapCreateDialogContent from './RoadmapCreateDialogContent.vue'

  const proxy = getCurrentInstance()!.proxy!
  const route = useRoute()
  const router = useRouter()
  const params = route.params as any
  const query = utils.queryToPlain(route.query)
  const page = usePageStore()
  const allow = page.inProject()!.allow

  const storyboard_dialog = ref(null! as InstanceType<typeof BlankDialog>)
  const requirement_dialog = ref(null! as InstanceType<typeof BlankDialog>)
  const roadmap_dialog = ref(null! as InstanceType<typeof BlankDialog>)
  const project_id = params.project_id

  const vueFlowContainer = ref(null! as HTMLDivElement)
  const { width, height } = useElementSize(vueFlowContainer)
  const size_mapping = ref({} as Record<string, { width: number | null, height: number | null }>)

  const { updateNodeData, addNodes, addEdges, fitView, getNodes } = useVueFlow()

  const platforms = ref(await new q.project.PlatformReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform())

  const test_case_labels = ref(await new q.project.TestCaseLabelInfoReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform())

  const roadmaps = ref(await new q.project.RoadmapReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform())

  const storyboards = ref(await new q.project.StoryboardReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform())

  const storyboard = ref(await new q.project.StoryboardReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.storyboard_id = params.storyboard_id
  }).perform())
  const position_mapping = ref(storyboard.value.positions)

  const requirements = ref(await new q.project.RequirementReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.storyboard_id = storyboard.value.id
  }).perform())

  const edges = ref([] as Edge[])
  const nodes = ref([] as Node[])
  parseDataAndLayout(requirements.value, position_mapping.value)

  function parseDataAndLayout(requirements: Requirement[], positions: Record<string, { x: number, y: number }> = {}) {
    const preNodes = [] as Node[]
    const preEdges = [] as Edge[]

    for (let i = 0 ;i < requirements.length; i++) {
      const requirement = requirements[i]
      const node_id = requirement.id.toString()
      const position = positions[node_id] || { x: 100 * i, y: 50 }

      preNodes.push({
        id: node_id,
        position: position,
        data: { requirement: requirement },
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
    if (Object.keys(positions).length > 0) {
      nodes.value = preNodes
    } else {
      nodes.value = layoutNodes(preNodes, preEdges, size_mapping.value)
    }

    if (storyboard.value.description) {
      const node_id = `storyboard_${storyboard.value!.id}`
      const position = positions[node_id] || { x: 10, y: 10 }

      nodes.value.push({
        id: node_id,
        position: position,
        data: storyboard.value,
        type: 'storyboard'
      })
    }
  }

  function layoutNodes(nodes: Node[], edges: Edge[], size_mapping: Record<string, { width: number | null, height: number | null }>): Node[] {
    var g = new dagre.graphlib.Graph()
    g.setGraph({ rankdir: storyboard.value.main_axle })
    g.setDefaultEdgeLabel(function() { return {} })

    nodes.forEach((node) => {
      g.setNode(node.id, { width: size_mapping[node.id]?.width ?? 260, height: size_mapping[node.id]?.height ?? 120 })
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

  const label_repo = computed(() => {
    return new LabelRepo().setup(test_case_labels.value)
  })

  function onStoryboardCreated() {
    router.go(0)
  }

  function onStoryboardUpdated(a_storyboard: Storyboard) {
    storyboards.value = storyboards.value.map((s) => s.id === a_storyboard.id ? a_storyboard : s)
    if (storyboard.value.id === a_storyboard.id) {
      storyboard.value = a_storyboard
    }

    updateNodeData(`storyboard_${a_storyboard.id}`, a_storyboard)
  }

  function onStoryboardDestroyed(a_storyboard: Storyboard) {
    router.push(`/projects/${params.project_id}/storyboards`)
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
    updateNodeData(a_requirement.id.toString(), { requirement: a_requirement })
  }

  function onRequirementCreated(new_requirement: Requirement) {
    requirements.value.push(new_requirement)
    parseDataAndLayout(requirements.value, position_mapping.value)
  }

  function onRequirementUpdated(a_requirement: Requirement) {
    requirements.value = requirements.value.map((r) => r.id === a_requirement.id ? a_requirement : r)
    updateNodeData(a_requirement.id.toString(), { requirement: a_requirement })
  }

  function onRequirementDestroyed(a_requirement: Requirement) {
    requirements.value = requirements.value.filter((r) => r.id !== a_requirement.id)
    parseDataAndLayout(requirements.value)
  }

  const resizeNodes = debounce(() => {
    parseDataAndLayout(requirements.value)
  }, 350)

  function resizeRequirement(a_requirement : Requirement, size: { width: number, height: number }) {
    size_mapping.value[a_requirement.id.toString()] ||= { width: null, height: null }
    size_mapping.value[a_requirement.id.toString()].width = size.width
    size_mapping.value[a_requirement.id.toString()].height = size.height

    if (Object.keys(position_mapping.value).length > 0) {
      return
    }

    resizeNodes()
  }

  function relayout() {
    position_mapping.value = {}
    resizeNodes()
  }

  async function save() {

    const position_mapping_data = getNodes.value.reduce((acc, node) => {
      acc[node.id] = { x: node.position.x, y: node.position.y }
      return acc
    }, {} as Record<string, { x: number, y: number }>)

    const a_storyboard = await new q.project.StoryboardReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = params.project_id
      req.interpolations.storyboard_id = storyboard.value.id
    }).perform({
      positions: position_mapping_data
    })

    storyboard.value = a_storyboard
  }

  const former = Former.build(new Filter())
  const { Form, FormGroup } = FormFactory<typeof former.form>()
  </script>
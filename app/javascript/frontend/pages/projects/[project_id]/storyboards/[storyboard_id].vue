<template>
  <PageHeader>
    <PageTitle>需求板</PageTitle>
    <template #actions>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button preset="ghost">
            <span>{{ roadmap?.title ?? '尚未发布' }}</span>
            <i class="fa-solid fa-caret-down ms-1"></i>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click.prevent="changeRoadmap()">新路线图</DropdownMenuItem>
          <DropdownMenuItem v-for="roadmap in roadmaps" @click.prevent="changeRoadmap(roadmap)">
            {{ roadmap.title }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button v-if="!roadmap && allow('create', Roadmap)" class="ms-auto" @click.prevent="roadmap_dialog.show(RoadmapCreateDialogContent)">保存线路图</Button>
      <Button v-if="roadmap && allow('update', roadmap)" class="ms-auto" @click.prevent="roadmap_dialog.show(RoadmapUpdateDialogContent, roadmap)">编辑线路图</Button>
    </template>
  </PageHeader>

  <div class="flex items-center -mb-px">
    <div class="overflow-y-auto scrollbar-none">
      <Nav preset="tabs">
        <NavItem v-for="storyboard in storyboards" class="shrink-0" as-child>
          <RLink :to="{ path: `${path_info.collection}/${storyboard.id}`, query: utils.plainToQuery(query) }">{{ storyboard.title }}</RLink>
        </NavItem>
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
        <FormGroup path="relate_stat_eq" label="关联状态">
          <controls.Selectpicker include-blank="任意">
            <SelectdropItem v-for="relate_stat in REQUIREMENT_RELATE_STATS" :value="relate_stat.value">
              {{ relate_stat.label }}
            </SelectdropItem>
          </controls.Selectpicker>
        </FormGroup>
      </Form>

      <template #actions>
        <Button preset="ghost" v-if="allow('read', Scene)" @click.prevent="scene_dialog.show(SceneListDialogContent, scenes)">场景列表 [{{ scenes.length }}]</Button>
        <Button preset="ghost" v-if="allow('update', storyboard)" @click.prevent="storyboard_dialog.show(StoryboardUpdateDialogContent, storyboard)">编辑</Button>
        <Button v-if="allow('create', Requirement)" @click.prevent="requirement_dialog.show(RequirementCreateDialogContent, platforms)">新建需求</Button>
      </template>
    </CardHeader>

    <div ref="vueFlowContainer" class="flex-1">
      <div :style="{ height: `${height}px` }">
        <VueFlow :nodes="nodes" :edges="edges" @edges-change="changeEdges" @connect="connect" @node-drag-stop="stopNodeDrag" @nodes-initialized="onNodesInitialized" :snap-grid="[10, 10]" snap-to-grid fit-view-on-init :max-zoom="1">
          <Background />

          <template #node-requirement="slotProps">
            <RequirementNode
              :platform_repo="platform_repo"
              :label_repo="label_repo"
              :requirement_stat_repo="requirement_stat_repo"
              :requirement="slotProps.data.requirement"
              :filter="former.form"
              :main_axle="storyboard.main_axle"
              @edit="requirement_dialog.show(RequirementUpdateDialogContent, $event)" />
          </template>

          <template #node-storyboard="slotProps">
            <StoryboardNode
              :storyboard="slotProps.data"
              @edit="storyboard_dialog.show(StoryboardUpdateDialogContent, $event)" />
          </template>

          <template #node-scene="slotProps">
            <SceneNode :scene="slotProps.data.scene" />
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

  <StoryboardDialog ref="storyboard_dialog" @created="createdStoryboard" @updated="updateStoryboard" @destroyed="destroyStoryboard" />
  <RequirementDialog
    ref="requirement_dialog"
    @created="createRequirement"
    @updated="updateRequirement"
    @destroyed="destroyRequirement"
    :platforms="platforms"
    :test_case_labels="test_case_labels"
    :scenes="scenes"
    :storyboard="storyboard" />
  <RoadmapDialog ref="roadmap_dialog" @created="" @updated="updatedRoadmap" />
  <SceneDialog ref="scene_dialog" :scenes="scenes" @created="createScene" @destroyed="destroyeScene" @updated="updateScene" />
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import BlankDialog from '@/components/BlankDialog.vue'
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { Button } from '$ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '$ui/card'
import { Nav, NavItem } from '$ui/nav'
import * as q from '@/requests'
import { useRoute, useRouter } from 'vue-router'
import { usePageStore } from '@/store'
import { LabelRepo, PlatformRepo, Requirement, Storyboard, Roadmap, RequirementStatRepo, Scene, SceneRepo, RequirementRepo } from '@/models'
import * as utils from "@/lib/utils"
import type { Connection, Edge, EdgeChange, GraphNode, Node, NodeChange, NodeDragEvent } from '@vue-flow/core'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import RequirementNode from './RequirementNode.vue'
import StoryboardNode from './StoryboardNode.vue'
import StoryboardCreateDialogContent from './StoryboardCreateDialogContent.vue'
import StoryboardUpdateDialogContent from './StoryboardUpdateDialogContent.vue'
import RequirementCreateDialogContent from './RequirementCreateDialogContent.vue'
import RequirementUpdateDialogContent from './RequirementUpdateDialogContent.vue'
import dagre from '@dagrejs/dagre'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'
import { Filter } from './type'
import SelectdropItem from '@/components/controls/selectdrop/SelectdropItem.vue'
import { useElementSize } from '@vueuse/core'
import { Background } from '@vue-flow/background'
import _, { debounce } from 'lodash'
import RLink from '@/components/RLink.vue'
import RoadmapCreateDialogContent from './RoadmapCreateDialogContent.vue'
import RoadmapUpdateDialogContent from './RoadmapUpdateDialogContent.vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'
import { REQUIREMENT_RELATE_STATS } from '@/constants'
import SceneListDialogContent from './SceneListDialogContent.vue'
import SceneNode from './SceneNode.vue'
import { useQueryLine } from '@/lib/useQueryLine'
import type { StoryboardFrameComponent } from '@/components/StoryboardFrame'
import type { RequirementFrameComponent } from '@/components/RequirementFrame'
import type { RoadmapFrameComponent } from '@/components/RoadmapFrame'
import type { SceneFrameComponent } from '@/components/SceneFrame'
import PathHelper from '@/lib/PathHelper'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const path_info = PathHelper.parseMember(route.path, 'show')
const query = utils.queryToPlain(route.query)
const page = usePageStore()
const allow = page.inProject()!.allow

const StoryboardDialog = BlankDialog as typeof BlankDialog & StoryboardFrameComponent
const storyboard_dialog = ref(null! as InstanceType<typeof BlankDialog & StoryboardFrameComponent>)
const RequirementDialog = BlankDialog as typeof BlankDialog & RequirementFrameComponent
const requirement_dialog = ref(null! as InstanceType<typeof BlankDialog & RequirementFrameComponent>)
const RoadmapDialog = BlankDialog as typeof BlankDialog & RoadmapFrameComponent
const roadmap_dialog = ref(null! as InstanceType<typeof BlankDialog & RoadmapFrameComponent>)
const SceneDialog = BlankDialog as typeof BlankDialog & SceneFrameComponent
const scene_dialog = ref(null! as InstanceType<typeof BlankDialog & SceneFrameComponent>)
const project_id = params.project_id

const vueFlowContainer = ref(null! as HTMLDivElement)
const { width, height } = useElementSize(vueFlowContainer)
const node_size_mapping = reactive(new Map<string, { dimensions: { width: number, height: number }, position: { x: number, y: number } }>())

const roadmap = ref(null as Roadmap | null)
const { updateNodeData, updateNode, addNodes, addEdges, getNodes } = useVueFlow()

const { data: platform_boxes } = line.request(q.project.platforms.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: test_case_label_boxes } = line.request(q.project.test_case_labels.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: roadmap_boxes } = line.request(q.project.roadmaps.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: storyboard_boxes } = line.request(q.project.storyboards.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: scene_boxes } = line.request(q.project.scenes.List(), (req, it) => {
  req.interpolations.project_id = params.project_id
  req.interpolations.storyboard_id = params.storyboard_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const platforms = computed(() => platform_boxes.value.map(it => it.platform))
const test_case_labels = computed(() => test_case_label_boxes.value.map(it => it.test_case_label))
const roadmaps = ref([] as Roadmap[])
roadmaps.value = roadmap_boxes.value.map(it => it.roadmap)
const storyboards = ref([] as Storyboard[])
const storyboard = ref(null! as  Storyboard)
storyboards.value = storyboard_boxes.value.map(it => it.storyboard)
storyboard.value = storyboards.value.find(it => it.id.toString() == params.storyboard_id.toString())!
const scenes = ref([] as Scene[])
scenes.value = scene_boxes.value.map(it => it.scene)

if (query.roadmap_id) {
  roadmap.value = roadmaps.value.find((r) => r.id === _.toInteger(query.roadmap_id)) ?? null
}

const position_mapping = computed(() => {
  const result = new Map()
  for (const [key, value] of Object.entries(storyboard.value.positions)) {
    const requirement_id = parseRequirementId(key)
    result.set(requirement_id, value)
  }
  return result
})

const { data: requirement_page } = line.request(q.project.requirements.Page(), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.storyboard_id = storyboard.value.id
  if (roadmap.value) {
    req.query = { roadmap_id: roadmap.value.id }
  }
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const requirements = ref([] as Requirement[])
requirements.value = requirement_page.value.list.map(it => it.requirement)

const requirement_repo = ref(new RequirementRepo().setup(requirements.value))
const requirement_stat_repo = computed(() => {
  return new RequirementStatRepo().setup(requirement_page.value.requirement_stats)
})

function rebuildRequirementRepo() {
  requirement_repo.value = new RequirementRepo().setup(requirements.value)
}

function requimentNodeId(requirement: Requirement | number) {
  if (typeof requirement === 'number') {
    return `requirement_${requirement}`
  } else {
    return `requirement_${requirement.id}`
  }
}

function sceneNodeId(scene: Scene | number) {
  if (typeof scene === 'number') {
    return `scene_${scene}`
  } else {
    return `scene_${scene.id}`
  }
}

function parseRequirementId(node_id: string) {
  const match = node_id.match(/^requirement_(\d+)$/)
  if (match) {
    return parseInt(match[1])
  }

  return parseInt(node_id)
}

const edges = ref([] as Edge[])
const nodes = ref([] as Node[])
rebuildNodes()

function rebuildNodes() {
  nodes.value = []
  edges.value = []

  for (let i = 0 ;i < requirements.value.length; i++) {
    const requirement = requirements.value[i]
    const node_id = requimentNodeId(requirement)
    const size = node_size_mapping.get(node_id)
    const position = position_mapping.value.get(requirement.id) ?? { x: 100 * i, y: 50 }

    nodes.value.push({
      id: node_id,
      position: size?.position ?? position,
      width: size?.dimensions.width,
      height: size?.dimensions.height,
      zIndex: 20,
      data: { requirement: requirement },
      type: 'requirement'
    })

    for (const upstream_id of requirement.upstream_ids) {
      edges.value.push({
        id: `${requimentNodeId(requirement)}-${requimentNodeId(upstream_id)}`,
        source: requimentNodeId(upstream_id),
        target: requimentNodeId(requirement)
      })
    }
  }

  if (node_size_mapping.size > 0) {
    updateScenePositions()
  }

  for (const scene of scenes.value) {
    const node_id = sceneNodeId(scene)
    const size = node_size_mapping.get(node_id)
    nodes.value.push({
      id: node_id,
      position: size?.position ?? { x: 100, y: 200 },
      width: size?.dimensions.width ?? 300,
      height: size?.dimensions.height ?? 200,
      zIndex: 10,
      draggable: false,
      data: { scene: scene },
      type: 'scene'
    })
  }
}

const platform_repo = computed(() => {
  return new PlatformRepo().setup(platforms.value)
})
console.log("platform_repo", platform_repo.value)

const label_repo = computed(() => {
  return new LabelRepo().setup(test_case_labels.value)
})

function createdStoryboard(a_storyboard: Storyboard) {
  storyboards.value.push(a_storyboard)
  storyboard.value = a_storyboard
}

function updateStoryboard(a_storyboard: Storyboard) {
  storyboards.value = storyboards.value.map((s) => s.id === a_storyboard.id ? a_storyboard : s)
  if (storyboard.value.id === a_storyboard.id) {
    storyboard.value = a_storyboard
  }

  updateNodeData(`storyboard_${a_storyboard.id}`, a_storyboard)
}

function destroyStoryboard(a_storyboard: Storyboard) {
  router.push(path_info.collection)
}

function connect(connection: Connection) {
  const requirement_id = parseRequirementId(connection.target)!
  const requirement = requirement_repo.value.id.find(requirement_id)
  if (!requirement) {
    return
  }

  const new_upstream_id = parseRequirementId(connection.source)!
  if (requirement.upstream_ids.includes(new_upstream_id)) {
    return
  }

  updateRequirementWithData(requirement, { upstream_ids: [...requirement.upstream_ids, new_upstream_id] })
  addEdges([{
    id: `${requirement.id}-${new_upstream_id}`,
    source: requimentNodeId(new_upstream_id),
    target: requimentNodeId(requirement)
  }])
}

function changeEdges(changes: EdgeChange[]) {
  for (const change of changes) {
    if (change.type != 'remove') {
      continue
    }

    const requirement_id = parseRequirementId(change.target)!
    const requirement = requirement_repo.value.id.find(requirement_id)
    if (!requirement) {
      continue
    }

    const old_upstream_id = parseRequirementId(change.source)!
    if (requirement.upstream_ids.includes(old_upstream_id)) {
      updateRequirement(requirement, { upstream_ids: requirement.upstream_ids.filter((id) => id !== old_upstream_id) })
    }
  }
}

function stopNodeDrag(event: NodeDragEvent) {
  const node = event.node
  const requirement_id = parseRequirementId(node.id)!
  const node_id = requimentNodeId(requirement_id)
  node_size_mapping.set(node_id, { dimensions: { ...node.dimensions }, position: { ...node.position } })
  updateScenePositions()
}

function onNodesInitialized(graphNodes: GraphNode[]) {
  node_size_mapping.clear()

  const requirement_nodes = graphNodes.filter(it => it.type == "requirement")
  for (const node of requirement_nodes) {
    const requirement_id = parseRequirementId(node.id)!
    const node_id = requimentNodeId(requirement_id)
    node_size_mapping.set(node_id, { dimensions: { ...node.dimensions }, position: { ...node.position } })
  }

  if (position_mapping.value.size == 0) {
    relayout()
  } else {
    updateScenePositions()
  }
}

function updateScenePositions() {
  for (const scene of scenes.value) {
    const requirements = requirement_repo.value.scene_id.findAll(scene.id)
    if (requirements.length > 0) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

      for (const req of requirements) {
        const nodeId = requimentNodeId(req.id)
        const size = node_size_mapping.get(nodeId)

        if (size) {
          minX = Math.min(minX, size.position.x)
          minY = Math.min(minY, size.position.y)
          maxX = Math.max(maxX, size.position.x + size.dimensions.width)
          maxY = Math.max(maxY, size.position.y + size.dimensions.height)
        }
      }

      const scene_node_id = sceneNodeId(scene)

      const inset = 50
      const position = { x: minX - inset, y: minY - inset }
      const dimensions = { width: maxX - minX + 2 * inset, height: maxY - minY + 2 * inset }
      updateNode(scene_node_id, {
        position: { ...position },
        width: dimensions.width,
        height: dimensions.height
      })
      node_size_mapping.set(scene_node_id, { dimensions, position })
    }
  }
}

const { mutateAsync: update_requirement_action } = line.request(q.project.requirements.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: update_storyboard_action } = line.request(q.project.storyboards.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function updateRequirementWithData(requirement: Requirement, data: any) {
  const a_requirement_box = await update_requirement_action({
    interpolations: {
      project_id: params.project_id,
      storyboard_id: storyboard.value.id,
      requirement_id: requirement.id
    },
    body: data
  })

  requirements.value = requirements.value.map((r) => r.id === a_requirement_box.requirement.id ? a_requirement_box.requirement : r)
  rebuildRequirementRepo()
  updateNodeData(requimentNodeId(a_requirement_box.requirement), { requirement: a_requirement_box.requirement })
  updateScenePositions()
}

function createRequirement(new_requirement: Requirement) {
  requirements.value.push(new_requirement)
  requirement_repo.value.setup([ new_requirement ])
  rebuildNodes()
}

function updateRequirement(a_requirement: Requirement) {
  requirements.value = requirements.value.map((r) => r.id === a_requirement.id ? a_requirement : r)
  rebuildRequirementRepo()
  updateNodeData(requimentNodeId(a_requirement), { requirement: a_requirement })
  updateScenePositions()
}

function destroyeRequirement(a_requirement: Requirement) {
  requirements.value = requirements.value.filter((r) => r.id !== a_requirement.id)
  rebuildRequirementRepo()
  rebuildNodes()
}

function updatedRoadmap(a_roadmap: Roadmap) {
  roadmaps.value = roadmaps.value.map((r) => r.id === a_roadmap.id ? a_roadmap : r)
  if (roadmap.value?.id === a_roadmap.id) {
    roadmap.value = a_roadmap
  }
}

function createScene(a_scene: Scene) {
  scenes.value.push(a_scene)
}

function destroyeScene(a_scene: Scene) {
  scenes.value = scenes.value.filter(scene => scene.id !== a_scene.id)
}

function updateScene(a_scene: Scene) {
  scenes.value = scenes.value.map(scene => scene.id === a_scene.id ? a_scene : scene)
}

function relayout() {
  const g = new dagre.graphlib.Graph({ compound: true })
  g.setGraph({ rankdir: storyboard.value.main_axle })
  g.setDefaultEdgeLabel(function() { return {} })

  const grouped_requirements = _.groupBy(requirements.value, requirement => {
    return requirement.scene_id
  })

  for (const scene_id of Object.keys(grouped_requirements)) {
    const vitual = `vitual_${scene_id}`
    g.setNode(vitual, { width: 0, height: 0 })

    for (const requirement of grouped_requirements[scene_id]) {
      const node_id = requimentNodeId(requirement)
      const size = node_size_mapping.get(node_id)!
      g.setNode(node_id, { width: size.dimensions.width, height: size.dimensions.height })
      g.setParent(node_id, vitual)
    }

    for (const requirement of grouped_requirements[scene_id]) {
      const upstream_ids = requirement.upstream_ids.filter(id => !!requirement_repo.value.id.find(id))
      for (const upstream_id of upstream_ids) {
        g.setEdge(requimentNodeId(upstream_id), requimentNodeId(requirement))
      }
    }
  }

  dagre.layout(g)

  for (const requirement of requirements.value) {
    const node_id = requimentNodeId(requirement)
    const item = g.node(node_id)
    const size = node_size_mapping.get(node_id)!

    updateNode(node_id, { position: { x: item.x, y: item.y } })
    node_size_mapping.set(node_id, { ...size, position: { x: item.x, y: item.y } })
  }

  updateScenePositions()
}

async function save() {
  const position_mapping_data = getNodes.value.reduce((acc, node) => {
    acc[node.id] = { x: node.position.x, y: node.position.y }
    return acc
  }, {} as Record<string, { x: number, y: number }>)

  const a_storyboard_box = await update_storyboard_action({
    interpolations: {
      project_id: params.project_id,
      storyboard_id: storyboard.value.id
    },
    body: {
      positions: position_mapping_data
    }
  })

  storyboard.value = a_storyboard_box.storyboard
}

const former = Former.build(new Filter())
const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

function changeRoadmap(roadmap: Roadmap | null = null) {
  const data = utils.compactObject({ ...query, roadmap_id: roadmap?.id })
  router.push({ query: utils.plainToQuery(data) })
}
</script>

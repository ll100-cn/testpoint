export class SceneItem {
  name: string
  path: string
  uuid: string
  children: SceneItem[] = []
}

export class TreeItem {
  role_name: string | null
  uuid: string
  scene_tree: SceneItem[] = []
}

export class Filter {
  [x: string]: string
  role_name: string | null
  scene_path: string | null
  archived: string = "0"
}

export type ChangeFilterFunction = (overrides: { [x: string]: string }) => void
import { TestCaseStat } from "@/models"

export class SceneItem {
  name: string
  path: string[] = []
  uuid: string
  children: SceneItem[] = []
  count: number = 0
  totalCount(): number {
    return this.count + this.children.reduce((acc, cur) => acc + cur.totalCount(), 0)
  }
}

export class TreeItem {
  role_name: string | null
  uuid: string
  scene_tree: SceneItem[] = []
  totalCount(): number {
    return this.scene_tree.reduce((acc, cur) => acc + cur.totalCount(), 0)
  }
}

export class Filter {
  [x: string]: string | string[]
  role_name: string | null
  scene_path: string[]
  archived: string = "0"
  platform_id: string | null
  label_id: string | null
}

export type ChangeFilterFunction = (overrides: { [x: string]: string | string[] }) => void

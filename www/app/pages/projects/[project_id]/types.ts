import type { TEST_CASE_RELATE_STATES } from "@/constants"
import { TestCase, TestCaseStat } from "@/models"
import _ from "lodash"

export class SceneItem {
  name: string
  path: string[] = []
  uuid: string
  children: SceneItem[] = []
  count: number = 0
  total_count(): number {
    return this.count + this.children.reduce((acc, cur) => acc + cur.total_count(), 0)
  }
}

export class TreeItem {
  role_name: string | null
  uuid: string
  sceneTree: SceneItem[] = []
  total_count(): number {
    return this.sceneTree.reduce((acc, cur) => acc + cur.total_count(), 0)
  }
}

export class ColumnFilter {
  only: string[] = []
  except: string[] = []

  constructor(overrides?: any) {
    Object.assign(this, overrides)
  }

  isEnabled(name: string): boolean {
    if (this.except.length > 0 && this.except.includes(name)) {
      return false
    }

    if (this.only.length > 0 && this.only.includes(name)) {
      return true
    }

    return this.only.length === 0
  }
}

export class Filter {
  role_name: string | null = null
  scene_path: string[] = []
  archived: string = "0"
  relateState: keyof typeof TEST_CASE_RELATE_STATES | null = null
  ignored: string | null = null
  // platform_id: string | null
  // label_id: string | null

  toParams(): { [x: string]: string | string[] } {
    return {
      role_name: this.role_name,
      scene_path: this.scene_path,
      archived: this.archived,
      relateState: this.relateState
      // platform_id: this.platform_id,
      // label_id: this.label_id,
    }
  }

  isMatch(test_case: TestCase, columns: ColumnFilter = new ColumnFilter()): boolean {
    // if (columns.isEnabled('platform_id') && !_.isEmpty(this.platform_id)) {
    //   if (!test_case.platform_ids.includes(_.toNumber(this.platform_id))) {
    //     return false
    //   }
    // }

    // if (columns.isEnabled('label_id') && !_.isEmpty(this.label_id)) {
    //   if (!test_case.label_ids.includes(_.toNumber(this.label_id))) {
    //     return false
    //   }
    // }

    if (columns.isEnabled('role_name') && this.role_name) {
      if (test_case.role_name !== (this.role_name === "" ? null : this.role_name)) {
        return false
      }
    }

    if (columns.isEnabled('archived') && this.archived) {
      if (test_case.archived !== (this.archived === "1" ? true : false)) {
        return false
      }
    }

    if (columns.isEnabled('scene_path') && !_.isEmpty(this.scene_path)) {
      if (!_.isEqual(this.scene_path, _.slice(test_case.scene_path, 0, this.scene_path.length))) {
        return false
      }
    }

    return true
  }
}

export type ChangeFilterFunction = (overrides: { [x: string]: string | string[] }) => void

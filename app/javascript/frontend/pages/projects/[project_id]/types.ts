import type { TEST_CASE_RELATE_STATES } from "@/constants"
import { TestCase, TestCaseStat } from "@/models"
import _ from "lodash"

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
  relate_state: keyof typeof TEST_CASE_RELATE_STATES | null = null
  ignored: string | null = null
  // platform_id: string | null
  // label_id: string | null

  toParams(): { [x: string]: string | string[] } {
    return {
      role_name: this.role_name,
      scene_path: this.scene_path,
      archived: this.archived,
      relate_state: this.relate_state
      // platform_id: this.platform_id,
      // label_id: this.label_id,
    }
  }

  isMatch(testCase: TestCase, columns: ColumnFilter = new ColumnFilter()): boolean {
    // if (columns.isEnabled('platform_id') && !_.isEmpty(this.platform_id)) {
    //   if (!testCase.platform_ids.includes(_.toNumber(this.platform_id))) {
    //     return false
    //   }
    // }

    // if (columns.isEnabled('label_id') && !_.isEmpty(this.label_id)) {
    //   if (!testCase.label_ids.includes(_.toNumber(this.label_id))) {
    //     return false
    //   }
    // }

    if (columns.isEnabled('role_name') && this.role_name) {
      if (testCase.role_name !== (this.role_name === "" ? null : this.role_name)) {
        return false
      }
    }

    if (columns.isEnabled('archived') && this.archived) {
      if (testCase.archived !== (this.archived === "1" ? true : false)) {
        return false
      }
    }

    if (columns.isEnabled('scene_path') && !_.isEmpty(this.scene_path)) {
      if (!_.isEqual(this.scene_path, _.slice(testCase.scene_path, 0, this.scene_path.length))) {
        return false
      }
    }

    return true
  }
}

export type ChangeFilterFunction = (overrides: { [x: string]: string | string[] }) => void

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
  roleName: string | null
  uuid: string
  sceneTree: SceneItem[] = []
  totalCount(): number {
    return this.sceneTree.reduce((acc, cur) => acc + cur.totalCount(), 0)
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
  roleName: string | null = null
  scenePath: string[] = []
  archived: string = "0"
  relateState: keyof typeof TEST_CASE_RELATE_STATES | null = null
  ignored: string | null = null
  // platform_id: string | null
  // label_id: string | null

  toParams(): { [x: string]: string | string[] } {
    return {
      roleName: this.roleName,
      scenePath: this.scenePath,
      archived: this.archived,
      relateState: this.relateState
      // platform_id: this.platform_id,
      // label_id: this.label_id,
    }
  }

  isMatch(testCase: TestCase, columns: ColumnFilter = new ColumnFilter()): boolean {
    // if (columns.isEnabled('platform_id') && !_.isEmpty(this.platform_id)) {
    //   if (!testCase.platformIds.includes(_.toNumber(this.platform_id))) {
    //     return false
    //   }
    // }

    // if (columns.isEnabled('label_id') && !_.isEmpty(this.label_id)) {
    //   if (!testCase.labelIds.includes(_.toNumber(this.label_id))) {
    //     return false
    //   }
    // }

    if (columns.isEnabled('roleName') && this.roleName) {
      if (testCase.roleName !== (this.roleName === "" ? null : this.roleName)) {
        return false
      }
    }

    if (columns.isEnabled('archived') && this.archived) {
      if (testCase.archived !== (this.archived === "1" ? true : false)) {
        return false
      }
    }

    if (columns.isEnabled('scenePath') && !_.isEmpty(this.scenePath)) {
      if (!_.isEqual(this.scenePath, _.slice(testCase.scenePath, 0, this.scenePath.length))) {
        return false
      }
    }

    return true
  }
}

export type ChangeFilterFunction = (overrides: { [x: string]: string | string[] }) => void

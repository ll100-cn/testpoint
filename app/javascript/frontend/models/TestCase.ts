import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'

export class TestCase {
  id!: number
  project_id!: number
  title!: string
  content!: string
  platform_ids: number[] = []
  label_ids: number[] = []
  role_name: string | null = null
  scene_name: string | null = null
  group_name: string | null = null
  scene_path?: string[]
  archived!: boolean

  storyboard_id: number | null = null
  requirement_id: number | null = null
  roadmap_id: number | null = null

  @Type(() => Date) updated_at!: Date
}

export class TestCaseBox {
  @t.Klass(TestCase) test_case!: TestCase
}

export class TestCasePage<Box extends TestCaseBox> extends Pagination<Box> {
  @t.Klass(TestCaseBox) list: Box[] = []
}

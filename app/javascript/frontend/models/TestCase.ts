import { Type } from "class-transformer"
export class TestCase {
  id!: number
  project_id!: number
  title!: string
  content!: string
  platform_ids: number[] = []
  label_ids: number[] = []
  role_name?: string
  scene_name?: string
  group_name?: string
  scene_path?: string[]
  archived!: boolean

  storyboard_id?: number
  requirement_id?: number
  roadmap_id?: number

  @Type(() => Date) updated_at!: Date
}
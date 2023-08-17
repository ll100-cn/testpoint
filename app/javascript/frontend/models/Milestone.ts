import { Type } from "class-transformer"

export class Milestone {
  id: number
  project_id: number
  title: string
  description: string
  platform_ids: number[]

  @Type(() => Date)
  published_at: Date;

  isPublished(): boolean {
    if (this.published_at == null) {
      return false
    }

    const now = new Date()
    return this.published_at <= now
  }
}
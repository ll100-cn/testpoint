import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'

export class Storyboard {
  id!: number

  title!: string
  main_axle!: string
  description?: string

  positions: Record<string, { x: number, y: number }> = {}
}

export class StoryboardBox {
  @t.Klass(Storyboard) storyboard!: Storyboard
}

export class StoryboardPage<Box extends StoryboardBox> extends Pagination<Box> {
  @t.Klass(StoryboardBox) list: Box[] = []
}
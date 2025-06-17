import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"

export class Storyboard {
  id!: number

  title!: string
  main_axle!: string
  description?: string

  positions: Record<string, { x: number, y: number }> = {}
}

export class StoryboardBoxImpl {
  @t.Klass(Storyboard) storyboard!: Storyboard
}

export type StoryboardBox = OmitByValue<StoryboardBoxImpl, Function>

export class StoryboardPage<Box extends StoryboardBox> extends Pagination<Box> {
  @t.Klass(StoryboardBoxImpl) list: Box[] = []
}
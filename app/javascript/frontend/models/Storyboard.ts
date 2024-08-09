import { Type } from "class-transformer"

export class Storyboard {
  id!: number

  title!: string
  main_axle!: string
  description?: string

  positions: Record<string, { x: number, y: number }> = {}
}
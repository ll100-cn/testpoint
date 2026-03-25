import { Pagination } from "./Pagination"
import * as t from '@/lib/transforms'
import type { OmitByValue } from "utility-types"
import type { CategorySchema } from './schema/category'

export class Category implements CategorySchema {
  id!: number
  name!: string
  description?: string
  color?: string
  projectId!: number
  defaultAsTestFailure!: boolean
}

export class CategoryBoxImpl {
  @t.Klass(Category) category!: Category
}

export type CategoryBox = OmitByValue<CategoryBoxImpl, Function>

export class CategoryPage<Box extends CategoryBox> extends Pagination<Box> {
  @t.Klass(CategoryBoxImpl) list: Box[] = []

  issues_counts?: Record<string, number>
}
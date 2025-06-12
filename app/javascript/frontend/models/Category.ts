import { Pagination } from "./Pagination"
import * as t from '@/lib/transforms'

export class Category {
  id!: number
  name!: string
  description?: string
  color?: string
  project_id!: number
  default_as_test_failure?: boolean
}

export class CategoryBox {
  @t.Klass(Category) category!: Category
}

export class CategoryPage<Box extends CategoryBox> extends Pagination<Box> {
  @t.Klass(CategoryBox) list: Box[] = []

  issues_counts?: Record<string, number>
}
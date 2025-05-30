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
  issue_count?: number
}

export class CategoryPage<Box extends CategoryBox> extends Pagination<Box> {
  @t.Klass(CategoryBox) list: Box[] = []
}
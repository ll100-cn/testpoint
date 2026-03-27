import { bva } from '$ui/utils'
import type { PaginationPresenter } from '$ui/pagination'

export const standard = {
  ellipsis: bva('w-9 h-9 flex items-center justify-center', {}),
} satisfies PaginationPresenter

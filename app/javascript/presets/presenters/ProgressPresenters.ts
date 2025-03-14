import { bva } from "$ui/utils"
import type { ProgressPresenter } from "$ui/progress"

export const standard = {
  root: bva('relative h-2 w-full overflow-hidden rounded-full bg-current/20', {}),
  indicator: bva('size-full flex-1 bg-current transition-all', {}),
} satisfies ProgressPresenter

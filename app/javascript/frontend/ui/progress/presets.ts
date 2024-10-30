import { bva } from "../utils"
import type { DropdownMenuPresenter } from "./types"

export const standard = {
  root: bva('relative h-2 w-full overflow-hidden rounded-full', {}),
  indicator: bva('size-full flex-1 bg-current transition-all', {}),
} satisfies ProgressPresenter

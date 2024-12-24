import { bva } from "../utils"
import type { TooltipPresenter } from "./types"

export const standard = {
  root: bva(``, {}),
  content: bva(`
    z-50 overflow-hidden rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground animate-in fade-in-0 zoom-in-95
    data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
    data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
  `, {}),
} satisfies TooltipPresenter
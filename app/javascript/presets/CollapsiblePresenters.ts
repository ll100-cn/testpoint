import { bva } from "$ui/utils"
import type { CollapsiblePresenter } from "$ui/collapsible"

export const standard = {
  root: bva('', {}),
  content: bva(`overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down`, { }),
} satisfies CollapsiblePresenter

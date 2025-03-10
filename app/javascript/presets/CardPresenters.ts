import { bva } from "$ui/utils"
import type { CardPresenter } from "$ui/card"

export const standard = {
  rounded: bva('rounded-md', { }),
  root: bva('border bg-card-background text-card-foreground relative flex flex-col', {}),
  header: bva('flex bg-foreground/3 border-b px-4 py-2 relative items-center', {}),
  content: bva('px-4 py-4 grow', {}),
  table: bva('[&_tr>*:first-child]:ps-4', {}),
  footer: bva('flex bg-foreground/3 gap-2 border-t items-center px-4 py-2', {}),
} satisfies CardPresenter
